<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //role dashboard redirections
    private function redirections(string $role){
        switch($role){

            case 'system_admin' :
                return '/systemadmin';
            case 'course_admin' :
                return '/courseadmin';
            case 'learner' :
                return '/learner';
            default:
                return '/';
        }
    }
    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();

        Log::info('Attempting login with credentials:', $credentials);

        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Invalid credentials'
            ],422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user ->createToken('authToken')->plainTextToken;
        $role = $user->role;

        //Role-Based redirections
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
            'role' => $user->role,
            'redirect_url' => $this->redirections($role)
        ]);

    }
    public function logout($request){

        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response(204);
    }



}
