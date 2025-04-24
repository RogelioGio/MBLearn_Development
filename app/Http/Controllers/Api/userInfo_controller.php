<?php

namespace App\Http\Controllers\Api;

use App\Filters\UserInfosFilter;
use App\helpers\LogActivityHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddUsersRequest;
use App\Http\Requests\BulkStoreUserRequest;
use App\Http\Requests\TestArrayRequest;
use App\Http\Requests\updateUserInfo;
use App\Models\Branch;
use App\Models\Course;
use App\Models\Department;
use App\Models\Division;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Section;
use App\Models\Subgroup;
use App\Models\Title;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\UserCredentials;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;

class userInfo_controller extends Controller
{

    //Add user information function
    //Change, only have 1 request that has information for both the userinfos and usercreds
    public function addUser(AddUsersRequest $addUsersRequest){

        $existingatedData = $addUsersRequest->validated();
        $title = Title::query()->find($existingatedData['title_id']);
        $department = Department::query()->find($existingatedData['department_id']);
        $branch = Branch::query()->find($existingatedData['branch_id']);
        $role = Role::query()->find($existingatedData['role_id']);
        $division = Division::query()->find($existingatedData['division_id']);
        $section = Section::query()->find($existingatedData['section_id']);
        $permissions = [];

        $profile_image = $this -> generateProfileImageurl($existingatedData['first_name'].$existingatedData['last_name']);
        $status = $existingatedData['status'] ?? 'Active';
        $existingUser = UserInfos::where('employeeID', $existingatedData['employeeID'])->first();

        if ($existingUser) {
            return response()->json([
                'message' => 'User already exists',
                'user' => $existingUser
            ], 409); // Use 409 Conflict instead of 200
        }

        // Combine first name, middle initial, last name, and suffix into a full name
        $fullName = trim("{$existingatedData['first_name']} " .
                            ("{$existingatedData['middle_name']}" ? "{$existingatedData['middle_name']}. " : "") .
                            "{$existingatedData['last_name']} " .
                            ("{$existingatedData['name_suffix']}" ? $existingatedData['name_suffix'] : ""));

        // Generate profile image URL (pass the correct name variable)
        $profile_image = $this->generateProfileImageUrl($fullName);

        $userCredentials = UserCredentials::create([
            'MBemail' => $existingatedData['MBemail'],
            'password' => $existingatedData['password'],
        ]);

        $userInfo = UserInfos::create([
            'employeeID' => $existingatedData['employeeID'],
            'first_name' => $existingatedData['first_name'],
            'last_name' => $existingatedData['last_name'],
            'middle_name' => $existingatedData['middle_name'],
            'name_suffix' => $existingatedData['name_suffix'],
            'status' =>$status,
            'profile_image' =>$profile_image
        ]);

        if($existingatedData['permissions']){
            foreach($existingatedData['permissions'] as $tests){
                foreach($tests as $key => $value){
                    $permissions[] = $value;
                }
            }
        }


        $userInfo->branch()->associate($branch);
        $userInfo->title()->associate($title);
        $userInfo->department()->associate($department);
        $userInfo->section()->associate($section);
        $userInfo->division()->associate($division);
        $userInfo->roles()->sync($role->id);
        $userInfo->save();
        $userCredentials->userInfos()->save($userInfo);
        $userInfo->permissions()->sync($permissions);
        // Return a success response
        return response()->json([
            'message' => 'User registered successfully',
            'user_info' => $userInfo->load(['permissions']),
            'user_role' => $userInfo->roles,
            'branch' => $userInfo->branch,
            'user_credentials' => $userCredentials
        ], 201);

    }

    public function bulkStoreUsers(BulkStoreUserRequest $bulkStoreUserRequest){
        $output = ['Bulk Store Complete'];
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
            $existing = UserInfos::query()->where('employeeID', '=', $single['employeeID'])->first();
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
                $output[] = "Employee ID: ".$empID." is already taken";
                continue;
            }

            if(11 > strlen($empID)){
                $output[] = "Employee ID: ".$empID." is invalid";
                continue;
            }

            if(!$title){
                $output[] = "Employee ID ".$empID." has an invalid title";
                continue;
            }
            if(!$role){
                $output[] = "Employee ID ".$empID." has an invalid role";
                continue;
            }
            if(!$branch){
                $output[] = "Employee ID ".$empID." has an invalid branch";
                continue;
            }
            if(!$department){
                $output[] = "Employee ID ".$empID." has an invalid department";
                continue;
            }
            if(!$section){
                $output[] = "Employee ID ".$empID." has an invalid section";
                continue;
            }
            if(!$division){
                $output[] = "Employee ID ".$empID." has an invalid division";
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
        array_splice($output, 1, 0, $counts);
        return response()->json([
            'Message' => $output
        ]);
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
        $user_id = $request->user()->id;

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
                $query->where('role_name', 'Course Admin');
            })
            ->whereDoesntHave('assignedCourses', function ($query) use($course) {
                $query->where('courses.id', $course->id);
            })->where('status', 'Active')
            ->with('roles','division','section','department','title','branch','city')
            ->paginate(5);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage(),
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
            ->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage(),
        ],200);
    }

    public function getAssignedCourses(UserInfos $userInfos, Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',6); //Number of entry per page
        $courses = $userInfos->assignedCourses()->with(['categories', 'types', 'training_modes'])->paginate($perPage);

        return response()->json([
            'data' => $courses->items(),
            'total' => $courses->total(),
            'lastPage' => $courses->lastPage(),
            'currentPage' => $courses->currentPage()
        ],200);
    }

    public function indexArchivedUsers(Request $request){
        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);

        $users =  UserInfos::query()->where($queryItems)
                ->where('status', '=', 'Inactive')
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

        $page = request()->input('page', 1);//Default page
        $perPage = request()->input('perPage',5); //Number of entry per page

        $courses = $userInfos->addedCourses()->with(['categories', 'types', 'training_modes'])->paginate($perPage);
        return response()->json([
            'data' => $courses->items(),
            'total' => $courses->total(),
            'lastPage' => $courses->lastPage(),
            'currentPage' => $courses->currentPage()
        ],200);
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
        $userInfos->department()->dissociate($department);
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
        $userInfos->branch()->disassociate($branch);
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
        $userInfos->title()->disassociate($title);
        $userInfos->save();
        return response()->json([
            "Message" => "Title removed",
            "Data" => $userInfos,
            "title" => $userInfos->title,
        ]);
    }

    public function getUserCourses(UserInfos $userInfos){
        $courses = $userInfos->enrolledCourses()->with(['categories', 'types', 'training_modes'])->paginate(3);
        return $courses;
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
        $title = Title::query()->find($existingatedData['title_id']);
        $department = Department::query()->find($existingatedData['department_id']);
        $branch = Branch::query()->find($existingatedData['branch_id']);

        if(!$userInfos){
            return response()->json(['message' => 'User not found'], 404);
        }
        $userInfos->branch()->associate($branch);
        $userInfos->title()->associate($title);
        $userInfos->department()->associate($department);
        $userInfos->save();

        $userInfos->update($existingatedData);
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

    public function test(Request $request){
        $user_id = $request->user();
        $arrays = $user_id->permissionsRole->toArray();
        $perm_names = [];
        $accept = false;
        foreach($arrays as $array){
            $perm_names[] = $array["permission_name"];
        }
        if(in_array("AddFormInput", $perm_names)){
            $accept = true;
        }
        return response()->json([
            "message" => $accept
        ]);
    }
}
