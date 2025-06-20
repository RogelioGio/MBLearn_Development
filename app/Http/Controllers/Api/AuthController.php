<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\MailComponent;
use App\Http\Requests\LoginRequest;
use App\Models\UserCredentials;
use App\Models\UserOtp;
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
    public function login(LoginRequest $request, MailComponent $mailComponent){

        $credentials = $request->validated();
        $key = 'login-attempts:'. Str::lower($credentials['MBemail']);
        $user = UserCredentials::where('MBemail', $credentials['MBemail'])->with(['userInfos.roles'])->first();
        $remaining = RateLimiter::remaining($key, 5);

        //OTP generation and verification
        $otp = rand(100000, 999999);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+5 minutes'));

        $htmlBody = view('emails.otp_template', [
            'otp' => $otp,
            'user' => $user->userInfos->first_name,
        ])->render();

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
            RateLimiter::clear($key);
            Log::info('User Login: ' . $user->userInfos->MBemail);
            // $redirect = $this->redirection($user->role);

            //Email OTP to user
            $result = $mailComponent->send(
                'talingdan.304273@novaliches.sti.edu.ph',
                "MBLearn Account Verification-".$user->userInfos->first_name,
                $htmlBody
            );

            UserOtp::updateOrCreate(
                ['user_creds_id' => $user->id],
                ['otp' => Hash::make($otp), 'expires_at' => $expiresAt]
            );

            return response()->json([
                'message' => 'Login Successful',
                'user' => $user,
                'OTPsent' => $result,
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

    public function verifyOtp(Request $request){

        $request->validate([
            'user_id' => 'required|exists:userCredentials,id',
            'otp' => 'required|digits:6',
            'user_email' => 'required|email',
        ]);

        //$user_info = UserCredentials::where('MBemail', $request->input("user_email"))->first();
        $user_id = $request->input('user_id');
        $input_otp = $request->input('otp');

        $user = UserCredentials::findOrFail($user_id);
        $userOtp = UserOtp::where('user_creds_id', $user->id)->where('expires_at','>',now())->first();

        //If OTP expire
        if(!$userOtp){
            return response()->json(['message' => 'OTP has expired or does not exist'], 400);
        }

        //Verify OTP
        if(!Hash::check($input_otp, $userOtp->otp)){
            return response() -> json([
                'message' => 'OTP is not matched',
            ],401);
        }else{
            $user->update(['timeout_count' => 0, 'last_logged_in' => now('Asia/Hong_Kong')->toDateTimeString()]);
            $token = $user->createToken('authToken')->plainTextToken;
            $redirect = $this->redirections($user->userInfos->roles->toArray());
        };

        $userOtp -> delete();

        return response() ->json([
            'message' => 'otp works',
            'token' => $token,
            'redirect' => $redirect,
        ]);

    }

    public function requestOTP(Request $request, MailComponent $mailComponent){

        $request -> validate([
            'user_id' => 'required|exists:userCredentials,id'
        ]);

        $otp = rand(100000, 999999);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+5 minutes'));
        $user = UserCredentials::findOrFail($request->input('user_id'));


        $htmlBody = view('emails.otp_template', [
            'otp' => $otp,
            'user' => $user->userInfos->first_name,
        ])->render();

        UserOtp::updateOrCreate(
            ['user_creds_id' => $user->id],
            ['otp' => Hash::make($otp), 'expires_at' => $expiresAt]
        );

        $result = $mailComponent->send(
                'talingdan.304273@novaliches.sti.edu.ph',
                "MBLearn Account Verification-".$user->userInfos->first_name,
                $htmlBody
            );

        return response() -> json([
            'message' => 'OTP Requested'
        ],200);
    }

    public function logout(Request $request){

        if ($user = $request->user()) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No user to logout'], 400);
    }

    //Request to reset password
    public function reqResetPassword(Request $request, MailComponent $mailComponent){

        $request->validate([
            'email' => 'required|email|exists:userCredentials,MBemail',
        ]);
        $email = $request->input('email');

        $user = UserCredentials::where('MBemail', $email)->with(['userInfos.division', 'userInfos.section','userInfos.department','userInfos.city','userInfos.branch','userInfos.roles'])->first();

        $fullname = trim($user->userInfos->first_name . ' ' . ($user->userInfos->middle_name ? $user->userInfos->middle_name . ' ' : '') . $user->userInfos->last_name . ' ' . ($user->userInfos->suffix ? $user->userInfos->suffix : ''));

        $htmlBody = view('emails.reset_password_notification',[
            'user_fullName' => $fullname,
            'user_MBEmail' => $user->MBemail,
            'employeeID' => $user->userInfos->employeeID,
            'division' => $user->userInfos->division ? $user->userInfos->division->division_name : "No Division Assigned",
            'department' => $user->userInfos->department ? $user->userInfos->department->department_name : "No Department Assigned",
            'section' => $user->userInfos->section ? $user->userInfos->section->section_name : "No Section Assigned",
            'city' => $user->userInfos->city ? $user->userInfos->city->city_name : "No City Assigned",
            'location' => $user->userInfos->branch ? $user->userInfos->branch->branch_name : "No Branch Assigned",
            'role' => $user->userInfos->roles[0]->role_name,
            'last_Logged_in' => $user->last_logged_in,
        ])->render();

        if(!$user){
            return response()->json([
                'message' => 'There is no user with that email',
            ], 404);
        }

        $result = $mailComponent->send(
            'talingdan.304273@novaliches.sti.edu.ph',
            "MBLearn Reset Password Request-".$fullname."-".$user->MBemail ,
            $htmlBody
        );

        return response()->json([
            'message' => 'User Found',
            'user' => $user,
            'RequestSent' => $result,
        ], 200);
    }




}
