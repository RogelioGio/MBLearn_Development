<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserCredentials;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        // $request ->validate([
        //     'user_id' => 'required|integer',
        // ]);

        //$user = UserCredentials::find(1);
        $user = auth()->user();

        if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
        }

        $notifications = $user->notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'type' => $notification->type,
                'data' => $notification->data,
                'read_at' => $notification->read_at,
                'created_at' => $notification->created_at,
            ];
        });

        return response()->json([
            'user' => $user,
            'notifications' => $notifications,
        ]);
    }
}
