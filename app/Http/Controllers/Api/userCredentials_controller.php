<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\addUserCredential_request;
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

    public function resetUsers()
{
    // Truncate the users table
    DB::table('userCredentials')->truncate();

    return response()->json([
        'message' => 'Users table truncated and auto-increment reset.'
    ]);
}
}
