<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\addUserCredential_request;
use App\Http\Requests\updateUserCreds_info;
use App\Models\UserCredentials;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class userCredentials_controller extends Controller
{
    public function addUserCredentials(addUserCredential_request $request){

        $validatedData = $request->validated()  ;

        $userCredentials = UserCredentials::create([
            'employeeID' => $validatedData['employeeID'],
            'name' => $validatedData['name'],
            'MBemail' => $validatedData['MBemail'],
            'password' => bcrypt($validatedData['password']),// Hash the password
            'role' => $validatedData['role']
        ]);


        return response()->json([
            'message' => 'User Credentials Added Successfully',
            'data' => $userCredentials],201);
    }

    //update user credentials in the user maintenance management
    public function updateUserCredentials(updateUserCreds_info $request, $employeeID){
        $validatedData = $request->validated();

        $userCredentials = UserCredentials::where('employeeID', $employeeID)->first();

        $userCredentials->update([
            'employeeID' => $validatedData['employeeID'],
            'name' => $validatedData['name'],
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

        $userCredentials = UserCredentials::paginate($perPage);

        return response()->json([
            'message' => 'User Credentials List',
            'total' => $userCredentials->total(),
            'last' => $userCredentials->lastPage(),
            'currentPage' => $userCredentials->currentPage(),
            'data' => $userCredentials->items()
        ]);
    }

    //find by employeeID in the user maintenance management
    public function findUser_EmployeeID($employeeID){
        $userCredentials = UserCredentials::where('employeeID', $employeeID)->first();

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
    public function deleteUser($employeeID)
    {
        $user = UserCredentials::where('employeeID', $employeeID)->first();

        if($user){
            $user->delete();
            return response()->json(['message' => 'User deleted successfully!'], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }



}
