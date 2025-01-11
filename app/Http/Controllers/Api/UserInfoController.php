<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\UserInfo;
use Illuminate\Support\Facades\DB;

class UserInfoController extends Controller
{
    public function userinfo()
    {
        $users = UserInfo::all();
        return response()->json($users);
    }

    public function selectedUser($id)
    {
        $user = Userinfo::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404); // Return a 404 response if user is not found
        }

        return response()->json($user); // Return the user as JSON
    }
}
