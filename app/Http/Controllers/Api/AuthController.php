<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\UserCredentials;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    //role dashboard redirections
    private function redirections(array $roles){
        foreach($roles as $role){
            if(in_array('System Admin', $role)){
                return '/systemadmin';
            } elseif(in_array('Course Admin', $role)){
                return '/courseadmin';
            } elseif(in_array('Learner', $role)){
                return '/learner';
            } else{
                return '/';
            }
        }
    }

    // private function redirection($roles){
    //     if($roles === 'System Admin'){
    //         return '/systemadmin';
    //     } elseif($roles === 'Course Admin'){
    //         return '/courseadmin';
    //     } elseif($roles === 'Learner'){
    //         return '/learner';
    //     } else{
    //         return '/';
    //     }
    // }

    //New Login to another table
    public function login(LoginRequest $request){

        $credentials = $request->validated();
        $key = 'login-attempts:'. Str::lower($credentials['MBemail']);
        $user = UserCredentials::where('MBemail', $credentials['MBemail'])->first();
        $remaining = RateLimiter::remaining($key, 5);

        if(!$user){
            return response()->json([
                'message' => 'There is no user with that credentials',
            ], 401);
        }

        if(!($user->userInfos->status === "Active")){
            return response()->json([
                'message' => 'This user is currently inactive'
            ], 401);
        }

        if(Auth::attempt($credentials)){
            $user->update(['timeout_count' => 0, 'last_logged_in' => now('Asia/Hong_Kong')->toDateTimeString()]);
            RateLimiter::clear($key);
            //Generate Login Token
            $token = $user->createToken('authToken')->plainTextToken;
            //Log
            Log::info('User Login: ' . $user->userInfos->MBemail);

            $redirect = $this->redirections($user->userInfos->roles->toArray());
            // $redirect = $this->redirection($user->role);

            return response()->json([
                'message' => 'Login Successful',
                'user' => $user,
                'token' => $token,
                'redirect' => $redirect
            ], 200);
        };

        if(RateLimiter::tooManyAttempts($key, 5)){
            $secondsUntilUnlocked = RateLimiter::availableIn($key);
            $minutes = ceil($secondsUntilUnlocked/60);
            return response()->json([
                'message' => "Maximum number of attempts tried, please try again in ". $minutes." minutes",
            ],401);
        }

        RateLimiter::hit($key,60*5);
        return response()->json([
            'message' => 'Invalid password, you have '. $remaining.' tries remaining',
        ], 401);
    }

    public function logout(Request $request){

        if ($user = $request->user()) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No user to logout'], 400);
    }


}
