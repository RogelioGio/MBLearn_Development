<?php

namespace App\Http\Controllers\Api;
use App\Events\NewNotification;
use App\Events\TestEvent;
use App\Filters\CourseSort;
use App\Filters\UserInfosFilter;
use App\helpers\LessonCountHelper;
use App\helpers\LogActivityHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddUsersRequest;
use App\Http\Requests\BulkStoreUserRequest;
use App\Http\Requests\TestArrayRequest;
use App\Http\Requests\updateUserInfo;
use App\Http\Requests\UserInfoSearchRequest;
use App\Jobs\PermissionToUser;
use App\Jobs\ResetOptionCache;
use App\Models\Branch;
use App\Models\CarouselImage;
use App\Models\Course;
use App\Models\CourseUserAssigned;
use App\Models\Department;
use App\Models\Division;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Section;
use App\Models\Subgroup;
use App\Models\Title;
use App\Models\Type;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\UserCredentials;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon as SupportCarbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Throwable;

class userInfo_controller extends Controller
{

    //Add user information function
    //Change, only have 1 request that has information for both the userinfos and usercreds
    public function addUser(AddUsersRequest $addUsersRequest){

        $existingatedData = $addUsersRequest->validated();

        if(UserInfos::where('employeeID', $existingatedData['employeeID'])->exists()){
            return response()->json([
                'message' => 'User already exists',
            ], 409);
        }

        if(UserCredentials::where('MBemail', $existingatedData['MBemail'])->exists()){
            return response()->json([
                'message' => 'User creds already exists',
            ], 409);
        }

        // Combine first name, middle initial, last name, and suffix into a full name
        $fullName = trim("{$existingatedData['first_name']} " .
                            ("{$existingatedData['middle_name']}" ? "{$existingatedData['middle_name']}. " : "") .
                            "{$existingatedData['last_name']} " .
                            ("{$existingatedData['name_suffix']}" ? $existingatedData['name_suffix'] : ""));

        // Generate profile image URL (pass the correct name variable)
        $profile_image = $this->generateProfileImageUrl($fullName);


        DB::beginTransaction();

        try{
            $options = Cache::get('options');
            $title = $options['titles']->firstWhere('id', $existingatedData['title_id']);
            $department = $options['departments']->firstWhere('id', $existingatedData['department_id']);
            $branch = $options['location']->firstWhere('id', $existingatedData['branch_id']);
            $division = $options['division']->firstWhere('id', $existingatedData['division_id']);
            $section = $options['section']->firstWhere('id', $existingatedData['section_id']);

            $status = $existingatedData['status'] ?? 'Active';

            $userCredentials = new UserCredentials([
                'MBemail' => $existingatedData['MBemail'],
                'password' => $existingatedData['password'],
            ]);

            $userInfo = new UserInfos([
                'employeeID' => $existingatedData['employeeID'],
                'first_name' => $existingatedData['first_name'],
                'last_name' => $existingatedData['last_name'],
                'middle_name' => $existingatedData['middle_name'],
                'name_suffix' => $existingatedData['name_suffix'],
                'status' =>$status,
                'profile_image' =>$profile_image
            ]);

            $userInfo->branch()->associate($branch);
            $userInfo->title()->associate($title);
            $userInfo->department()->associate($department);
            $userInfo->section()->associate($section);
            $userInfo->division()->associate($division);
            $userInfo->save();
            $userInfo->roles()->sync($existingatedData['role_id']);
            $userCredentials->save();
            $userCredentials->userInfos()->save($userInfo);

            DB::commit();

            if($existingatedData['permissions'] ?? false){
                PermissionToUser::dispatch($userInfo, $existingatedData['permissions'] ?? []);
            }

            return response()->json([
                'message' => 'User registered successfully',
                'user_info' => $userInfo,
                'permissions' => $existingatedData['permissions'] ?? false
            ], 201);
        } catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ],400);
        }

    }

    public function bulkStoreUsers(BulkStoreUserRequest $bulkStoreUserRequest){
        $output = [];
        $count = 0;
        $bulk = collect($bulkStoreUserRequest->all())->map(function ($arr, $key){
            $messyArray = [];
            $oneDArray = [];
            foreach($arr as $key => $value){
                switch($key){
                    case 'role':
                        $role = (Role::query()->where('role_name', '=', $value)->first());
                        $messyArray[] = [$key => $role];
                        break;
                    case 'title':
                        $title = (Title::query()->where('title_name', '=', $value)->first());
                        $messyArray[] = [$key => $title];
                        break;
                    case 'department':
                        $department = (Department::query()->where('department_name', '=', $value)->first());
                        $messyArray[] = [$key => $department];
                        break;
                    case 'branch':
                        $branch = (Branch::query()->where('branch_name', '=', $value)->first());
                        $messyArray[] = [$key => $branch];
                        break;
                    case 'division':
                        $division = (Division::query()->where('division_name', '=', $value)->first());
                        $messyArray[] = [$key => $division];
                        break;
                    case 'section':
                        $section = (Section::query()->where('section_name', '=', $value)->first());
                        $messyArray[] = [$key => $section];
                        break;
                    default:
                        $messyArray[] = [$key => $value];
                }
            }
            $oneDArray = array_reduce($messyArray, 'array_merge', []);
            return $oneDArray;
        });
        foreach($bulk as $single){
            $existing = UserInfos::query()->where('employeeID', '=', $single['employeeID'])->exists();
            $email = strtolower(preg_replace('/\s+/', '', $single['first_name'])
                        .preg_replace('/\s+/', '', $single['last_name'])
                        ."@mbtc.com");
            $password = preg_replace('/\s+/', '', $single['first_name'])."_".$single['employeeID'];
            $empID = $single['employeeID'];
            $role = $single['role'];
            $title = $single['title'];
            $branch = $single['branch'];
            $department = $single['department'];
            $division = $single['division'];
            $section = $single['section'];
            // Combine first name, middle initial, last name, and suffix into a full name
            $fullName = trim("{$single['first_name']} " .
                                ("{$single['middle_name']}" ? "{$single['middle_name']}. " : "") .
                                "{$single['last_name']} " .
                                ("{$single['name_suffix']}" ? $single['name_suffix'] : ""));

            // Generate profile image URL (pass the correct name variable)
            $profile_image = $this->generateProfileImageUrl($fullName);

            // Default status to 'Active' if not provided
            $status = $single['status'] ?? 'Active';

            if($existing){
                $output[1][] = "Employee: ".$fullName." employee ID is already taken";
                continue;
            }

            if(11 > strlen($empID)){
                $output[1][] = "Employee: ".$fullName."'s employee ID is less than 11 characters";
                continue;
            }

            if(!$title){
                $output[1][] = "Employee: ".$fullName." has an invalid title";
                continue;
            }
            if(!$role){
                $output[1][] = "Employee: ".$fullName." has an invalid role";
                continue;
            }
            if(!$branch){
                $output[1][] = "Employee: ".$fullName." has an invalid branch";
                continue;
            }
            if(!$department){
                $output[1][] = "Employee: ".$fullName." has an invalid department";
                continue;
            }
            if(!$section){
                $output[1][] = "Employee: ".$fullName." has an invalid section";
                continue;
            }
            if(!$division){
                $output[1][] = "Employee: ".$fullName." has an invalid division";
                continue;
            }
            $userCredentials = UserCredentials::create([
                "MBemail" => $email,
                "password" => $password
            ]);

            $userInfo = UserInfos::create([
                'employeeID' => $single['employeeID'],
                'first_name' => $single['first_name'],
                'last_name' => $single['last_name'],
                'middle_name' => $single['middle_name'],
                'name_suffix' => $single['name_suffix'],
                'status' =>$status,
                'profile_image' =>$profile_image
            ]);

            $count += 1;
            $userInfo->branch()->associate($single['branch']);
            $userInfo->title()->associate($single['title']);
            $userInfo->department()->associate($single['department']);
            $userInfo->section()->associate($single['section']);
            $userInfo->division()->associate($single['division']);
            $userInfo->roles()->sync($single['role']['id']);
            $userInfo->save();
            $userCredentials->userInfos()->save($userInfo);
        }
        $counts = $count."/".$bulk->count()." Successfully Added Users";
        array_splice($output, 0, 0, $counts);
        return response()->json([
            'data' => $output
        ]);
    }

    public function UserInfoSearch(UserInfoSearchRequest $request){
        $search = $request['search'];
        $perPage = $request->input('perPage', 5); //Number of entry per page
        $page = $request->input('page', 1);//Default page
        $status = $request['status'] ?? 'Active';
        $course_id = $request['course_id'] ?? null;
        $relation = $request['relation'] ?? 'enrollments';
        $result = UserInfos::search($search);

        if(!$course_id){
            $result = $result->query(function($query) use ($status) {
                $query->where('status', '=', $status)
                    ->with(['roles', 'division', 'section', 'department', 'title', 'branch', 'city']);
                return $query;
            })->paginate($perPage);

        }else{
            $result = $result->query(function($query) use($status, $course_id, $relation){
                if($relation == 'enrolled'){
                    $query->where('status', '=', $status)
                        ->whereHas('enrollments', function($subquery) use ($course_id){
                            $subquery->where('courses.id', '=', $course_id);
                        })
                        ->with(['roles', 'division', 'section', 'department', 'title', 'branch', 'city']);
                    return $query;
                } else if($relation == 'assigned'){
                    $query->where('status', '=', $status)
                        ->whereHas('assignedCourses', function($subquery) use ($course_id){
                            $subquery->where('courses.id', '=', $course_id);
                        })
                        ->with(['roles', 'division', 'section', 'department', 'title', 'branch', 'city']);
                    return $query;
                }
            })->paginate($perPage);
        }

        return response()->json([
            'data' => $result->items(),
            'total' => $result->total(),
            'lastPage' => $result->lastPage(),
            'currentPage' => $result->currentPage(),
        ], 200);
    }

    /**
    * Generate a default profile image URL based on the user's name
    */
    private function generateProfileImageurl($name){
        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=ffffff&background=03045e&bold=true&size=400';
    }

    /**
     * Fetch all user entries from the UserInfo table.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexUsers(Request $request){

        Gate::authorize('viewAny', UserInfos::class);
        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page
        $user_id = $request->user()->userInfos->id;

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);

        $users =  UserInfos::query()->where($queryItems)
        ->where('status', '=', 'Active')
        ->whereNot(function (Builder $query) use ($user_id){
            $query->where('id', $user_id);
        })
        ->with('roles','division','section','department','title','branch','city')
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage(),
        ],200);
    }

    public function indexAvailableCourseAdmins(Request $request, Course $course){
        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);
        $users = UserInfos::query()
            ->where($queryItems)
            ->whereHas('roles', function(Builder $query){
                $query->whereNot('role_name', 'Learner');
            })
            ->whereDoesntHave('assignedCourses', function ($query) use($course) {
                $query->where('courses.id', $course->id);
            })->where('status', 'Active')
            ->with('roles','division','section','department','title','branch','city')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $users,
        ],200);
    }

    public function indexEnrollingUsers(Request $request, Course $course){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',4); //Number of entry per page

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);
        $users = UserInfos::query()
            ->where($queryItems)
            ->whereDoesntHave('enrolledCourses', function ($query) use($course) {
                $query->where('courses.id', $course->id);
            })->where('status', 'Active')
            ->with('roles','division','section','department','title','branch','city')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage(),
        ],200);
    }

    public function getAssignedCourses(UserInfos $userInfos, Request $request){

        $filterData = [
            'page' => $request->input('page', 1),
            'perPage' => $request->input('perPage', 6),
            'type_id' => $request->input('type_id'),
            'category_id' => $request->input('category_id'),
            'training_type' => $request->input('training_type'),
        ];
        $cacheKey = 'userInfo'.$userInfos->id.':assignedCourses:'.json_encode($filterData);

        if(!Cache::has($cacheKey)){
            $courses = Cache::remember($cacheKey, now(), function() use ($userInfos, $request, $filterData){
            $page = $filterData['page'];
            $perPage = $filterData['perPage'];

            $sort = new CourseSort();
            $builder = $userInfos->assignedCourses();
            $querySort = $sort->transform($builder, $request);

            if(!empty($filterData['type_id']) && $filterData['type_id'] != ""){
                $querySort->whereHas('types', function($subQuery) use ($filterData){
                    $subQuery->where('type_id', $filterData['type_id']);
                });
            }

            if(!empty($filterData['category_id']) && $filterData['category_id'] != ""){
                $querySort->whereHas('categories', function($subQuery) use ($filterData){
                    $subQuery->where('category_id', $filterData['category_id']);
                });
            }

            if(!empty($filterData['training_type']) && $filterData['training_type'] != ""){
                $querySort->where('training_type', $filterData['training_type']);
            }

            $paginate = $querySort->with(['categories', 'types', 'training_modes','adder','lessons'])
                ->where('archived', '=', 'active')
                ->paginate($perPage, ['*'], 'page', $page);

            foreach($paginate as $course){
                if($course->lessonCount() > 0){
                    $course->progress = round($userInfos->lessonsCompletedCount($course->id)/$course->lessonCount() * 100, 2);
                }else{
                    $course->progress = 0;
                }
                $course->deadline = Enrollment::query()
                    ->where('user_id', '=', $userInfos->id)
                    ->where('course_id', '=', $course->id)
                    ->pluck('end_date')
                    ->first();
            }

            return $paginate;
            });

            $courses = LessonCountHelper::getEnrollmentStatusCount($courses);
            return response() -> json([
                'data' => $courses->items(),
                'total' => $courses->total(),
                'lastPage' => $courses->lastPage(),
                'currentPage' => $courses->currentPage(),
            ]);
        }

        $test = Cache::get($cacheKey);
        $test = LessonCountHelper::getEnrollmentStatusCount($test);

        return response() -> json([
            'data' => $test->items(),
            'total' => $test->total(),
            'lastPage' => $test->lastPage(),
            'currentPage' => $test->currentPage(),
        ]);
    }

    public function indexArchivedUsers(Request $request){
        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page
        $currentUserId = $request->user()->userInfos->id;

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);

        $users =  UserInfos::query()->where($queryItems)
                ->where('status', '=', 'Inactive')
                ->whereNot(function($query) use ($currentUserId){
                    $query->where('id', $currentUserId);
                })
                ->orderBy('created_at', 'desc')
                ->with('roles','division','section','department','title','branch','city')
                ->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage()
        ],200);
    }

    public function indexNotLearnerUsers(Request $request){
        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);
        $perPage = $request->input('perPage',5); //Number of entry per page
        $user_id = $request->user()->id;
        $admins = UserInfos::query()
        ->where($queryItems)
        ->whereHas('roles',function($query){
            $query->where('role_name', '=', 'Course Admin');
        })->whereNot(function (Builder $query) use ($user_id){
            $query->where('id', $user_id);
        })
        ->where('status', '=', 'Active')
        ->orderBy('created_at', 'desc')
        ->with('roles','division','section','department','title','branch','city')
        ->paginate($perPage);

        return response()->json([
            'data' => $admins->items(),
            'total' => $admins->total(),
            'lastPage' => $admins->lastPage(),
            'currentPage' => $admins->currentPage()
        ]);
    }

    public function getAddedCourses(UserInfos $userInfos,Request $request){
        $filterData = [
            'page' => $request->input('page', 1),
            'perPage' => $request->input('perPage', 6),
            'type_id' => $request->input('type_id'),
            'category_id' => $request->input('category_id'),
            'training_type' => $request->input('training_type'),
        ];
        $cacheKey = 'userInfo'.$userInfos->id.':addedCourses:'.json_encode($filterData);

        if(!Cache::has($cacheKey)){
            $courses = Cache::remember($cacheKey, now(), function() use ($userInfos, $request, $filterData){
            $page = $filterData['page'];
            $perPage = $filterData['perPage'];

            $sort = new CourseSort();
            $builder = $userInfos->addedCourses();
            $querySort = $sort->transform($builder, $request);

            if(!empty($filterData['type_id']) && $filterData['type_id'] != ""){
                $querySort->whereHas('types', function($subQuery) use ($filterData){
                    $subQuery->where('type_id', $filterData['type_id']);
                });
            }

            if(!empty($filterData['category_id']) && $filterData['category_id'] != ""){
                $querySort->whereHas('categories', function($subQuery) use ($filterData){
                    $subQuery->where('category_id', $filterData['category_id']);
                });
            }

            if(!empty($filterData['training_type']) && $filterData['training_type'] != ""){
                $querySort->where('training_type', $filterData['training_type']);
            }

            $paginate = $querySort->with(['categories', 'types', 'training_modes','adder','lessons'])
                ->where('archived', '=', 'active')
                ->paginate($perPage);

            foreach($paginate as $course){
                if($course->lessonCount() > 0){
                    $course->progress = round($userInfos->lessonsCompletedCount($course->id)/$course->lessonCount() * 100, 2);
                }else{
                    $course->progress = 0;
                }
                $course->deadline = Enrollment::query()
                    ->where('user_id', '=', $userInfos->id)
                    ->where('course_id', '=', $course->id)
                    ->pluck('end_date')
                    ->first();
            }

            return $paginate;
            });

            $courses = LessonCountHelper::getEnrollmentStatusCount($courses);
            return response() -> json([
                'data' => $courses->items(),
                'total' => $courses->total(),
                'lastPage' => $courses->lastPage(),
                'currentPage' => $courses->currentPage(),
            ]);
        }

        $test = Cache::get($cacheKey);
        $test = LessonCountHelper::getEnrollmentStatusCount($test);

        return response() -> json([
            'data' => $test->items(),
            'total' => $test->total(),
            'lastPage' => $test->lastPage(),
            'currentPage' => $test->currentPage(),
        ]);
    }

    //You add user id then role id in url /addRole/{userInfos}/{role}
    public function addRole(UserInfos $userInfos, Role $role){
        $userInfos->roles()->syncWithoutDetaching($role->id);
        return response()->json([
            "Message" => "Role Added",
            "Data" => $userInfos,
            "Roles" => $userInfos->roles,
        ]);
    }

    public function removeRole(UserInfos $userInfos, Role $role){
        $userInfos->roles()->detach($role->id);
        return response()->json([
            "Message" => "Role Removed",
            "Data" => $userInfos,
            "Roles" => $userInfos->roles,
        ]);
    }

    public function addPermission(UserInfos $userInfos, Permission $permission){
        $userInfos->permissions()->attach($permission->id);
        return response()->json([
            "Message" => "Permission Added",
            "Data" => $userInfos
        ]);
    }

    public function RemovePermission(UserInfos $userInfos, Permission $permission){
        $userInfos->permissions()->detach($permission->id);
        return response()->json([
            "Message" => "Permission Removed",
            "Data" => $userInfos
        ]);
    }

    public function addDepartment(UserInfos $userInfos, Department $department){
        $userInfos->department()->associate($department);
        $userInfos->save();
        return response()->json([
            "Message" => "Department Attached",
            "Data" => $userInfos,
            "department" => $userInfos->department,
        ]);
    }

    public function removeDepartment(UserInfos $userInfos, Department $department){
        $userInfos->department()->disassociate();
        $userInfos->save();
        return response()->json([
            "Message" => "Department removed",
            "Data" => $userInfos,
            "department" => $userInfos->department,
        ]);
    }

    public function addBranch(UserInfos $userInfos, Branch $branch){
        $userInfos->branch()->associate($branch);
        $userInfos->save();
        return response()->json([
            "Message" => "Branch Attached",
            "Data" => $userInfos,
            "branch" => $userInfos->branch,
        ]);
    }

    public function removeBranch(UserInfos $userInfos, Branch $branch){
        $userInfos->branch()->disassociate();
        $userInfos->save();
        return response()->json([
            "Message" => "Branch removed",
            "Data" => $userInfos,
            "branch" => $userInfos->branch,
        ]);
    }

    public function addTitle(UserInfos $userInfos, Title $title){
        $userInfos->title()->associate($title);
        $userInfos->save();
        return response()->json([
            "Message" => "Title Attached",
            "Data" => $userInfos,
            "title" => $userInfos->title,
        ]);
    }

    public function removeTitle(UserInfos $userInfos, Title $title){
        $userInfos->title()->disassociate();
        $userInfos->save();
        return response()->json([
            "Message" => "Title removed",
            "Data" => $userInfos,
            "title" => $userInfos->title,
        ]);
    }

    public function enrollmentStatusCount(UserInfos $userInfos){
        $enrolled = 0;
        $ongoing = 0;
        $finished = 0;

        $enrollments = $userInfos->enrollments()->get();
        foreach($enrollments as $enrollment){
            if($enrollment->enrollment_status == "enrolled"){
                $enrolled += 1;
            }else if($enrollment->enrollment_status == "ongoing"){
                $ongoing += 1;
            }else if($enrollment->enrollment_status == "finished"){
                $finished += 1;
            }
        }
        return response()->json([
            'enrolled_count' => $enrolled,
            'ongoing_count' => $ongoing,
            'finished_count' => $finished
        ]);
    }

    public function getUserCourses(UserInfos $userInfos, Request $request){
        $filterData = [
            'page' => $request->input('page', 1),
            'perPage' => $request->input('perPage', 6),
            'type_id' => $request->input('type_id'),
            'category_id' => $request->input('category_id'),
            'training_type' => $request->input('training_type'),
            'enrollment_status' => $request->input('enrollment_status'),
        ];
        $cacheKey = 'userInfo'.$userInfos->id.':enrolledCourses:'.json_encode($filterData);

        if(!Cache::has($cacheKey)){
            $courses = Cache::remember($cacheKey, now(), function() use ($userInfos, $request, $filterData){
            $page = $filterData['page'];
            $perPage = $filterData['perPage'];

            $sort = new CourseSort();
            $builder = $userInfos->enrolledCourses();
            $querySort = $sort->transform($builder, $request);

            if(!empty($filterData['type_id']) && $filterData['type_id'] != ""){
                $querySort->whereHas('types', function($subQuery) use ($filterData){
                    $subQuery->where('type_id', $filterData['type_id']);
                });
            }

            if(!empty($filterData['category_id']) && $filterData['category_id'] != ""){
                $querySort->whereHas('categories', function($subQuery) use ($filterData){
                    $subQuery->where('category_id', $filterData['category_id']);
                });
            }

            if(!empty($filterData['training_type']) && $filterData['training_type'] != ""){
                $querySort->where('training_type', $filterData['training_type']);
            }

            if(!empty($filterData['enrollment_status']) && $filterData['enrollment_status'] != ""){
                $querySort->whereHas('enrollments', function($subQuery) use ($filterData){
                    $subQuery->where('enrollment_status', $filterData['enrollment_status']);
                });
            }

            $paginate = $querySort->with(['categories', 'types', 'training_modes','lessons'])
                ->where('archived', '=', 'active')
                ->paginate($perPage);


            return $paginate;
            });
            foreach($courses as $course){
            if($course->lessonCount() > 0){
                $course->progress = round($userInfos->lessonsCompletedCount($course->id)/$course->lessonCount() * 100, 2);
            }else{
                $course->progress = 0;
            }
            $course->deadline = Enrollment::query()
                ->where('user_id', '=', $userInfos->id)
                ->where('course_id', '=', $course->id)
                ->pluck('end_date')
                ->first();
            }
            LessonCountHelper::getEnrollmentStatusCount($courses);
            return response() -> json([
                'data' => $courses->items(),
                'total' => $courses->total(),
                'lastPage' => $courses->lastPage(),
                'currentPage' => $courses->currentPage(),
            ]);
        }

        $test = Cache::get($cacheKey);
        foreach($test as $course){
            if($course->lessonCount() > 0){
                $course->progress = round($userInfos->lessonsCompletedCount($course->id)/$course->lessonCount() * 100, 2);
            }else{
                $course->progress = 0;
            }
            $course->deadline = Enrollment::query()
                ->where('user_id', '=', $userInfos->id)
                ->where('course_id', '=', $course->id)
                ->pluck('end_date')
                ->first();
        }
        LessonCountHelper::getEnrollmentStatusCount($test);

        return response() -> json([
            'data' => $test->items(),
            'total' => $test->total(),
            'lastPage' => $test->lastPage(),
            'currentPage' => $test->currentPage(),
        ]);
    }

    /**
     * Display the specified user info.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function findUser(UserInfos $userInfos)
    {
        // Find the user info by ID
        $user = UserInfos::with(['city', 'branch', 'department', 'title', 'roles', 'userCredentials']) // Added 'roles'
        ->find($userInfos->id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'data' => $user,
            'city' => $user->city,
            'branch' => $user->branch,
            'department' => $user->department,
            'title' => $user->title,
            'credentials' => $user->userCredential,
            'roles' => $user->roles, // Include roles in the response
        ]);
    }

    //Find User using employeeID
    public function findUser_EmployeeID($employeeID)
    {
        // Find the user info by Employee ID
        $user = UserInfos::where('employeeID', $employeeID)
        ->with('roles')
        ->first();

        if($user){
            return response() -> json(['data' => $user], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);  // Return error if not found
        }
    }

    /**
     * Update the specified user info.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateUser(UserInfos $userInfos, updateUserInfo $request){

        //Input Validation
        $existingatedData = $request->validated();
        $file = $request->file('image');
        $path = "";
        if($file){
            $path = $file->store('/'.$userInfos->id, 'profiles');
        }
        $title = Title::query()->find($existingatedData['title_id']);
        $department = Department::query()->find($existingatedData['department_id']);
        $branch = Branch::query()->find($existingatedData['branch_id']);
        $section = Section::query()->find($existingatedData['section_id']);
        $division = Division::query()->find($existingatedData['division_id']);

        if(!$userInfos){
            return response()->json(['message' => 'User not found'], 404);
        }
        $userInfos->branch()->associate($branch);
        $userInfos->title()->associate($title);
        $userInfos->section()->associate($section);
        $userInfos->division()->associate($division);
        $userInfos->department()->associate($department);
        $userInfos->save();

        $userInfos->update($existingatedData);
        if(!$path === ""){
            $userInfos->update(["profile_image" => $path]);
        }

        //Update UserInfo
        return response()->json([
            "Message" => 'Updated User',
            "Data" => $userInfos
        ]);
    }

    //Delete User
    public function deleteUser(UserInfos $userInfos)
    {
        Gate::authorize('delete', UserInfos::class);
        if($userInfos){
            $userInfos->status = "Inactive";
            $userInfos->save();

            // LogActivityHelper::logActivity('Delete user', 'Deleted a user', "User Full Name: " . $userInfos->first_name . " " . $userInfos->last_name);
            return response()->json(['message' => 'User is now set to inactive'], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function restoreUser(UserInfos $userInfos)
    {
        if($userInfos){
            $userInfos->status = "Active";
            $userInfos->save();
            return response()->json(['message' => 'User restored'], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    //Truncate
    public function resetUser()
    {
        // Truncate the users table
        DB::table('userInfo')->truncate();
        return response()->json(['message' => 'User Info table reset successfully!'], 200);
    }

    //Fetch UserProfilePhoto for the UserCredentials
    public function getProfile(Request $request)
    {
        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $profile_image = UserInfos::select('profile_image','employeeID')->paginate($perPage);
        return response()->json([
            'data' => $profile_image->items(),
            'total' => $profile_image->total(),
            'lastPage' => $profile_image->lastPage(),
            'currentPage' => $profile_image->currentPage()
        ],200);
    }

    public function test(){
        // $course = Course::query()->find(71);
        // $user = UserInfos::query()->find(109);
        // $pivot = $course->assignedCourseAdmins()->where('user_id', $user->id)->first()->pivot;
        // $permIds = $course->course_permissions->pluck('id')->toArray();
        // $perm = CourseUserAssigned::find($pivot->id);

        // // $perm->permissions()->sync([1,2]);
        // $userInfo = UserInfos::find(128);
        // PermissionToUser::dispatch($userInfo, $existingatedData['permissions'] ?? []);
        // $message = "Hello from laravel";
        // broadcast(new TestEvent($message));
        // TestEvent::broadcast($message);
        // return response()->json([
        //     'data' => "Done"
        // ]);


        {
            $user = UserCredentials::query()->find(1); // Replace with the actual user ID

            $user->unreadNotifications->markAsRead();

            return response()->json(['message' => 'All notifications marked as read']);
        }
    }
}
