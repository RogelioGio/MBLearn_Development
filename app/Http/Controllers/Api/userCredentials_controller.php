<?php

namespace App\Http\Controllers\Api;

use App\Events\UserPermissionsChange;
use App\Events\UserRoleChange;
use App\Http\Controllers\Controller;
use App\Http\Requests\addUserCredential_request;
use App\Http\Requests\ChangeUserPasswordRequest;
use App\Http\Requests\ChangeUserPermissionsRequest;
use App\Http\Requests\updateUserCreds_info;
use App\Http\Requests\UserCredsSearchRequest;
use App\Http\Resources\CourseResource;
use App\Models\Role;
use App\Models\UserCredentials;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class userCredentials_controller extends Controller
{
    public function addUserCredentials(addUserCredential_request $request){

        $validatedData = $request->validated();

        //Check if the employeeID exists in the userInfos table
        $userInfo = UserInfos::where('employeeID', $validatedData['employeeID'])->first();
        if (!$userInfo) {
            return response()->json([
                'message' => 'User Info not found for employeeID: ' . $validatedData['employeeID']
            ], 404);
        }


        $userCredentials = UserCredentials::create([
            'MBemail' => $validatedData['MBemail'],
            'password' => bcrypt($validatedData['password']),// Hash the password
            'user_info_id' => $userInfo->id
        ]);


        return response()->json([
            'message' => 'User Credentials Added Successfully',
            'data' => $userCredentials],201);
    }

    //update user credentials in the user maintenance management
    public function updateUserCredentials(UserCredentials $userCredentials,updateUserCreds_info $request){
        $validatedData = $request->validated();

        $userCredentials->update([
            'password' => bcrypt($validatedData['password']),
            'MBemail' => $validatedData['MBemail']
        ]);

        return response()->json([
            'message' => 'User Credentials Updated Successfully',
            'data' => $userCredentials
        ]);
    }

    public function changeUserPermissions(UserCredentials $userCredentials, ChangeUserPermissionsRequest $request){
        $adder = Auth::user()->userInfos->first_name;
        $affected = $userCredentials->userInfos->first_name;
        if(!$request['role']){
            $bulk = collect($request['permissions'])->map(function($arr, $key){
            $test = [];
            foreach($arr as $keys => $value){
                $test = $value;
            }
            return $test;
            });
            $userCredentials->userInfos->permissions()->sync($bulk);
            $userCredentials->userInfos->roles;
            UserPermissionsChange::dispatch($adder, $affected);

        return response()->json([
            'message' => 'Roles and Permissions changed',
            'user' => $userCredentials->load(['userInfos.permissions', 'userInfos.roles']),
        ]);
        }
        $userCredentials->userInfos->roles()->sync($request['role']);
        $role_name = Role::find($request['role'])->role_name;
        $bulk = collect($request['permissions'])->map(function($arr, $key){
            $test = [];
            foreach($arr as $keys => $value){
                $test = $value;
            }
            return $test;
        });
        $userCredentials->userInfos->permissions()->sync($bulk);
        UserRoleChange::dispatch($adder, $affected, $role_name);

        return response()->json([
            'message' => 'Permissions changed',
            'user' => $userCredentials->load(['userInfos.permissions']),
        ]);
    }

    public function resetUserPassword(UserCredentials $userCredentials){
        $userInfo = $userCredentials->userInfos;
        $userCredentials->update([
            'password' => bcrypt(preg_replace('/\s+/', '', $userInfo->first_name)."_".$userInfo->employeeID),
            'first_log_in' => false
        ]);

        return response()->json([
            'message' => 'User Password Updated Successfully',
            'data' => $userCredentials
        ]);
    }

    public function changePassword(UserCredentials $userCredentials, ChangeUserPasswordRequest $request ){
        $validated = $request->validated();
        if(!$userCredentials){
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $userCredentials->update([
            'password' => bcrypt($validated['password']),
            'first_log_in' => true
        ]);
        return response()->json([
            'message' => 'Password has been changed',
            'user' => $userCredentials
        ], 200);
    }

    //User Credential List
    public function userCredentialsList(Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page
        $currentUserId = $request->user()->userInfos->id;
        $count = 0;
        $query = UserCredentials::with(['userInfos', 'userInfos.roles', 'userInfos.city', 'userInfos.branch',
        'userInfos.department', 'userInfos.section', 'userInfos.division', 'userInfos.title','userInfos.permissions'])
        ->orderBy('created_at', 'desc')
        ->whereHas('userInfos', function ($subQuery) {
            $subQuery->where('status', 'Active');
        })
        ->whereNot(function ($query) use ($currentUserId){
            $query->where('id', $currentUserId);
        });

        if ($request->has('department_id')) {
            if(!($request->input('department_id')['eq'] == "")){
                $query->whereHas('userInfos', function ($subQuery) use ($request) {
                    $subQuery->where('department_id', $request->input('department_id'));
                });
            }
        }

        if ($request->has('branch_id')) {
            if(!($request->input('branch_id')['eq'] == "")){
                $query->whereHas('userInfos', function ($subQuery) use ($request) {
                    $subQuery->where('branch_id', $request->input('branch_id'));
                });
            }
        }

        if ($request->has('role_id')){
            if(!($request->input('role_id')['eq'] == "")){
                $query->whereHas('roles', function($subQuery) use ($request){
                    $subQuery->where('role_id', $request->input('role_id'));
                });
            }
        }

        // Paginate the filtered results
        $userCredentials = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'total' => $userCredentials->total(),
            'lastPage' => $userCredentials->lastPage(),
            'currentPage' => $userCredentials->currentPage(),
            'data' => $userCredentials->items()
        ]);

    }
    public function UnuserCredentialsList(Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page
        $currentUserId = $request->user()->userInfos->id;
        $query = UserCredentials::whereHas('userInfos', function ($subQuery) {
            $subQuery->where('status', 'Inactive');
        })
        ->with(['userInfos', 'userInfos.roles', 'userInfos.city', 'userInfos.branch', 'userInfos.department', 'userInfos.section', 'userInfos.division', 'userInfos.title','userInfos.permissions'])
        ->whereNot(function ($query) use ($currentUserId){
            $query->where('id', $currentUserId);
        })
        ->orderBy('created_at', 'desc');

        // Paginate the filtered results
        $userCredentials = $query->paginate($perPage);

        return response()->json([
            'total' => $userCredentials->total(),
            'lastPage' => $userCredentials->lastPage(),
            'currentPage' => $userCredentials->currentPage(),
            'data' => $userCredentials->items()
        ]);

    }

    public function UserCredsSearch(UserCredsSearchRequest $request){
        $search = $request['search'];
        $perPage = $request->input('perPage', 5); //Number of entry per page
        $page = $request->input('page', 1);//Default page
        $status = $request['status'] ?? 'Active';
        $result = UserCredentials::search($search);

        $result = $result->whereHas('userInfos', function ($query) use ($status) {
            $query->where('status', $status)->with(['userInfos', 'userInfos.roles', 'userInfos.city', 'userInfos.branch',
        'userInfos.department', 'userInfos.section', 'userInfos.division', 'userInfos.title']);
        })->paginate($perPage);

        return response()->json([
            'total' => $result->total(),
            'lastPage' => $result->lastPage(),
            'currentPage' => $result->currentPage(),
            'data' => $result->items()
        ]);

    }

    public function findUser_Creds(UserCredentials $userCredentials){
        return $userCredentials->load(['userInfos', 'userInfos.roles', 'userInfos.city', 'userInfos.branch',
        'userInfos.department', 'userInfos.section', 'userInfos.division', 'userInfos.title','userInfos.permissions']);
    }

    //find by employeeID in the user maintenance management
    public function findUser_EmployeeID($employeeID){
        $userinfo = UserInfos::where('employeeID', $employeeID)->first();

        $userCredentials = $userinfo->userCredentials;
        if($userCredentials){
            return response()->json([
                'message' => 'User Credentials Found',
                'data' => $userCredentials
            ]);
        }else{
            return response()->json([
                'message' => 'User Credentials Not Found'
            ],404);
        }
    }

    public function restoreUser(UserCredentials $userCredentials)
    {
        if($userCredentials){
            $userCredentials->userInfos->update(['status' => "Active"]);
            $userCredentials->save();
            return response()->json(['message' => 'User restored', 'user' => $userCredentials], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function resetUsers()
    {
        // Truncate the users table
        DB::table('userCredentials')->truncate();

        return response()->json([
            'message' => 'Users table truncated and auto-increment reset.'
        ]);
    }

    //Delete User
    public function deleteUser(UserCredentials $userCredentials)
    {
        $userCredentials->userInfos->status = "Inactive";
        $userCredentials->userInfos->save();
        return response()->json([
            'message' => 'User is now set to inactive'
        ]);
    }

    public function updateOnlyPermissions(UserCredentials $userCredentials, Request $request)
    {
    $adder = Auth::user()->userInfos->first_name;
    $affected = $userCredentials->userInfos->first_name;

    // Validate that permissions is an array of integers
    $validated = $request->validate([
        'permissions' => 'required|array',
        'permissions.*' => 'integer|exists:permissions,id'
    ]);

    $userCredentials->userInfos->permissions()->sync($validated['permissions']);

    // Dispatch event (optional)
    UserPermissionsChange::dispatch($adder, $affected);

    return response()->json([
        'message' => 'Permissions successfully updated.',
        'user' => $userCredentials->load(['userInfos.permissions']),
    ]);
    }

    public function updateTest($userCredentialsId, ChangeUserPermissionsRequest $request) {
        $user = UserCredentials::with('userInfos', 'userInfos.roles','userInfos.permissions')->findOrFail($userCredentialsId)->userInfos;
        if (!$user) {
            return response()->json(['message' => 'UserInfo not found for this user.'], 404);
        }


        if($request->has('role')){
            $user->roles()->sync([$request->input('role')]);
            $user->load('roles');
        }

        if($request->has('permissions')){
            $permissionIds = collect($request->input('permissions'))
                ->pluck('permissionId')
                ->toArray();
            $user->permissions()->sync($permissionIds);
            $user->load('permissions');
        }

        return response() -> json([
            'message' => "The user and role updated",
            'User' => $user,
        ]);
    }


}
