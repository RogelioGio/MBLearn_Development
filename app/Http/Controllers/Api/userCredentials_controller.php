<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\addUserCredential_request;
use App\Http\Requests\ChangeUserPermissionsRequest;
use App\Http\Requests\updateUserCreds_info;
use App\Http\Resources\CourseResource;
use App\Models\UserCredentials;
use App\Models\UserInfos;
use Illuminate\Http\Request;
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
        $bulk = collect($request->all())->map(function($arr, $key){
            $test = [];
            foreach($arr as $key => $value){
                $test = $value;
            }
            return $test;
        });

        $userCredentials->userInfos->permissions()->sync($bulk);

        return response()->json([
            'message' => 'Permissions changed',
            'user' => $userCredentials->load(['userInfos.permissions']),
        ]);
    }

    //User Credential List
    public function userCredentialsList(Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page
        $currentUserId = $request->user()->userInfos->id;
        $count = 0;
        $query = UserCredentials::with(['userInfos', 'userInfos.roles', 'userInfos.city', 'userInfos.branch',
        'userInfos.department', 'userInfos.section', 'userInfos.division', 'userInfos.title'])
        ->whereHas('userInfos', function ($subQuery) use ($currentUserId) {
            $subQuery->where('status', 'Active')
            ->where('id', '!=', $currentUserId); // Ensure only Active users are fetched
        });

        // Apply filters based on userInfos attributes
        if ($request->has('status')) {
            if(!($request->input('status')['eq'] == "")){
                $query->whereHas('userInfos', function ($subQuery) use ($request) {
                    $subQuery->where('status', $request->input('status'));
                });
            }
        }

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

        // $userCredentials = UserCredentials::with(['userInfos', 'userInfos.roles'])->paginate($perPage);

        // return response()->json([
        //     'total' => $userCredentials->total(),
        //     'lastPage' => $userCredentials->lastPage(),
        //     'currentPage' => $userCredentials->currentPage(),
        //     'data' => $userCredentials->items()
        // ]);

        $query = UserCredentials::with(['userInfos', 'userInfos.roles']) ->whereHas('userInfos', function ($subQuery) {
            $subQuery->where('status', 'Inactive'); // Ensure only Active users are fetched
        });

        // Apply filters based on userInfos attributes
        if ($request->has('status')) {
            if(!($request->input('status')['eq'] == "")){
                $query->whereHas('userInfos', function ($subQuery) use ($request) {
                    $subQuery->where('status', $request->input('status'));
                });
            }
        }

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
        $userCredentials = $query->paginate($perPage);

        return response()->json([
            'total' => $userCredentials->total(),
            'lastPage' => $userCredentials->lastPage(),
            'currentPage' => $userCredentials->currentPage(),
            'data' => $userCredentials->items()
        ]);

    }

    public function findUser_Creds(UserCredentials $userCredentials){
        return $userCredentials->load(['userInfos', 'userInfos.roles', 'userInfos.city', 'userInfos.branch',
        'userInfos.department', 'userInfos.section', 'userInfos.division', 'userInfos.title']);
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
            $userCredentials->userInfos->status = "Active";
            $userCredentials->save();
            return response()->json(['message' => 'User restored'], 200);
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

}
