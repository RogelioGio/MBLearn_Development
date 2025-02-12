<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\UserCredentials;
use Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //role dashboard redirections
    // private function redirections(array $role){
    //     if(in_array('System Admin', $role['role_name'])){
    //         return '/systemadmin';
    //     } elseif(in_array('Course Admin', $role['role_name'])){
    //         return '/courseadmin';
    //     } elseif(in_array('Learner', $role['role_name'])){
    //         return '/learner';
    //     } else{
    //         return '/';
    //     }
    // }

    private function redirection($roles){
        if($roles === 'System Admin'){
            return '/systemadmin';
        } elseif($roles === 'Course Admin'){
            return '/courseadmin';
        } elseif($roles === 'Learner'){
            return '/learner';
        } else{
            return '/';
        }
    }



    //New Login to another table
    public function login(LoginRequest $request){

        $credentials = $request->validated();
        $user = UserCredentials::where('MBemail', $credentials['MBemail'])->first();

        if(!($user->userInfos->status === "Active")){
            return response()->json([
                'message' => 'This user is currently inactive'
            ]);
        }

        if(!$user){
            return response()->json([
                'message' => 'There is no user with that credentials',
            ], 401);
        }

        if(!Hash::check($credentials['password'], $user->password)){
            return response()->json([
                'message' => 'Invalid password',
            ], 401);
        }

        if($user && Hash::check($credentials['password'], $user->password)){
            //Generate Login Token
            $token = $user->createToken('authToken')->plainTextToken;
            //Log
            Log::info('User Login: ' . $user->MBemail);

            //$redirect = $this->redirections($user->userInfos->roles->toArray());
            $redirect = $this->redirection($user->role);

            return response()->json([
                'message' => 'Login Successful',
                'user' => $user,
                'token' => $token,
                'redirect' => $redirect
            ], 200);
        };
    }

    public function logout(Request $request){

        if ($user = $request->user()) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No user to logout'], 400);
    }


}
