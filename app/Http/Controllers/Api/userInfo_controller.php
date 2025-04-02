<?php

namespace App\Http\Controllers\Api;

use App\Filters\UserInfosFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddUsersRequest;
use App\Http\Requests\BulkStoreUserRequest;
use App\Http\Requests\updateUserInfo;
use App\Models\Branch;
use App\Models\Course;
use App\Models\Department;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Title;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\UserCredentials;
use Illuminate\Support\Arr;

class userInfo_controller extends Controller
{

    //Add user information function
    //Change, only have 1 request that has information for both the userinfos and usercreds
    public function addUser(AddUsersRequest $addUsersRequest){

        $validatedData = $addUsersRequest->validated();
        $title = Title::query()->find($validatedData['title_id']);
        $department = Department::query()->find($validatedData['department_id']);
        $branch = Branch::query()->find($validatedData['branch_id']);
        $role = Role::query()->find($validatedData['role_id']);

        $profile_image = $this -> generateProfileImageurl($validatedData['first_name'].$validatedData['last_name']);
        $status = $validatedData['status'] ?? 'Active';
        $existingUser = UserInfos::where('employeeID', $validatedData['employeeID'])->first();

        if ($existingUser) {
            return response()->json([
                'message' => 'User already exists',
                'user' => $existingUser
            ], 409); // Use 409 Conflict instead of 200
        }

        // Combine first name, middle initial, last name, and suffix into a full name
        $fullName = trim("{$validatedData['first_name']} " .
                            ("{$validatedData['middle_name']}" ? "{$validatedData['middle_name']}. " : "") .
                            "{$validatedData['last_name']} " .
                            ("{$validatedData['name_suffix']}" ? $validatedData['name_suffix'] : ""));

        // Generate profile image URL (pass the correct name variable)
        $profile_image = $this->generateProfileImageUrl($fullName);

        $userCredentials = UserCredentials::create([
            'MBemail' => $validatedData['MBemail'],
            'password' => $validatedData['password'],
        ]);

        $userInfo = UserInfos::create([
            'employeeID' => $validatedData['employeeID'],
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'middle_name' => $validatedData['middle_name'],
            'name_suffix' => $validatedData['name_suffix'],
            'status' =>$status,
            'profile_image' =>$profile_image
        ]);

        $userInfo->branch()->associate($branch);
        $userInfo->title()->associate($title);
        $userInfo->department()->associate($department);
        $userInfo->roles()->sync($role->id);
        $userInfo->save();
        $userCredentials->userInfos()->save($userInfo);
        // Return a success response
        return response()->json([
            'message' => 'User registered successfully',
            'user_info' => $userInfo,
            'user_role' => $userInfo->roles,
            'branch' => $userInfo->branch,
            'user_credentials' => $userCredentials
        ], 201);

    }

    public function bulkStoreUsers(BulkStoreUserRequest $bulkStoreUserRequest){

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
                    default:
                        $messyArray[] = [$key => $value];
                }
            }
            $oneDArray = array_reduce($messyArray, 'array_merge', []);
            return $oneDArray;
        });
        foreach($bulk as $single){

            // Combine first name, middle initial, last name, and suffix into a full name
            $fullName = trim("{$single['first_name']} " .
                                ("{$single['middle_name']}" ? "{$single['middle_name']}. " : "") .
                                "{$single['last_name']} " .
                                ("{$single['name_suffix']}" ? $single['name_suffix'] : ""));

            // Generate profile image URL (pass the correct name variable)
            $profile_image = $this->generateProfileImageUrl($fullName);

            // Default status to 'Active' if not provided
            $status = $single['status'] ?? 'Active';
            $userCredentials = UserCredentials::create([
                "MBemail" => $single['MBemail'],
                "password" => $single['password']
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

            $userInfo->branch()->associate($single['branch']);
            $userInfo->title()->associate($single['title']);
            $userInfo->department()->associate($single['department']);
            $userInfo->roles()->sync($single['role']['id']);
            $userInfo->save();
            $userCredentials->userInfos()->save($userInfo);
        }
        return response()->json([
            'Message' => $bulkStoreUserRequest->all()
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

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);

        $users =  UserInfos::query()->where($queryItems)->where('status', '=', 'Active')->with('roles','department','title','branch','city')->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage()
        ],200);
    }

    public function getAssignedCourses(UserInfos $userInfos){

        $courses = $userInfos->assignedCourses()->with(['categories', 'types', 'training_modes'])->paginate(5);
        return $courses;
    }

    public function indexArchivedUsers(Request $request){
        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);

        $users =  UserInfos::query()->where($queryItems)->where('status', '=', 'Inactive')->with('roles','department','title','branch','city')->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage()
        ],200);
    }

    public function indexNotLearnerUsers(Request $request){
        $perPage = $request->input('perPage',5); //Number of entry per page
        $admins = UserInfos::query()->whereHas('roles',function($query){
            $query->where('role_name', '!=', 'Learner');
        })->with('roles','department','title','branch','city')->paginate($perPage);

        return response()->json([
            'data' => $admins->items(),
            'total' => $admins->total(),
            'lastPage' => $admins->lastPage(),
            'currentPage' => $admins->currentPage()
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
        $courses = $userInfos->enrolledCourses()->with(['categories', 'types', 'training_modes'])->paginate(5);
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
        $validatedData = $request->validated();
        $title = Title::query()->find($validatedData['title_id']);
        $department = Department::query()->find($validatedData['department_id']);
        $branch = Branch::query()->find($validatedData['branch_id']);

        if(!$userInfos){
            return response()->json(['message' => 'User not found'], 404);
        }
        $userInfos->branch()->associate($branch);
        $userInfos->title()->associate($title);
        $userInfos->department()->associate($department);
        $userInfos->save();

        $userInfos->update($validatedData);
        //Update UserInfo
        return response()->json([
            "Message" => 'Updated User',
            "Data" => $userInfos
        ]);
    }

    //Delete User
    public function deleteUser(UserInfos $userInfos)
    {
        if($userInfos){
            $userInfos->status = "Inactive";
            $userInfos->save();
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
        return response()->json(['message' => 'Test'], 200);
    }

}
