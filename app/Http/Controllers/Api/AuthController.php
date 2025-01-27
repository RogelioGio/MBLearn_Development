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
    private function redirections(string $role){
        switch($role){

            case 'System Admin' :
                return '/systemadmin';
            case 'Course Admin' :
                return '/courseadmin';
            case 'Learner' :
                return '/learner';
            default:
                return '/';
        }
    }

    //New Login to another table
    public function login(LoginRequest $request){

        $credentials = $request->validated();
        $user = UserCredentials::where('MBemail', $credentials['MBemail'])->first();

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

            $redirect = $this->redirections($user->role);

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
