<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\addUserCredential_request;
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

    //User Credential List
    public function userCredentialsList(Request $request){

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
            $subQuery->where('status', 'Active'); // Ensure only Active users are fetched
        });

        // Apply filters based on userInfos attributes
        if ($request->has('status')) {
            $query->whereHas('userInfos', function ($subQuery) use ($request) {
                $subQuery->where('status', $request->input('status'));
            });
        }

        if ($request->has('department_id')) {
            $query->whereHas('userInfos', function ($subQuery) use ($request) {
                $subQuery->where('department_id', $request->input('department_id'));
            });
        }

        if ($request->has('branch_id')) {
            $query->whereHas('userInfos', function ($subQuery) use ($request) {
                $subQuery->where('branch_id', $request->input('branch_id'));
            });
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
            $query->whereHas('userInfos', function ($subQuery) use ($request) {
                $subQuery->where('status', $request->input('status'));
            });
        }

        if ($request->has('department_id')) {
            $query->whereHas('userInfos', function ($subQuery) use ($request) {
                $subQuery->where('department_id', $request->input('department_id'));
            });
        }

        if ($request->has('branch_id')) {
            $query->whereHas('userInfos', function ($subQuery) use ($request) {
                $subQuery->where('branch_id', $request->input('branch_id'));
            });
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



    public function showEnrolledCourses(UserCredentials $userCredentials){
        return CourseResource::collection($userCredentials->enrolledCourses);
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
