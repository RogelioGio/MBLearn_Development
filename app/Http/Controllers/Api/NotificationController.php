<?php

namespace App\Http\Controllers\Api;

use App\Events\NotificationsMarkedAsRead;
use App\Events\TestEvent;
use App\Http\Controllers\Controller;
use App\Models\UserCredentials;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
        }

        $limit = $request->input('limit', 5);
        $page = $request->input('page', 1);

        $notifications = $user->notifications()->orderBy('created_at', 'desc')->paginate($limit);


        return response()->json([
        'data' => $notifications->items(),
        'current_page' => $notifications->currentPage(),
        'last_page' => $notifications->lastPage(),
        'per_page' => $notifications->perPage(),
        'total' => $notifications->total(),
        ]);
    }

    public function hasUnreadNotifications(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
        }

        $unreadCount = $user->unreadNotifications->count();

        return response()->json([
            'has_unread' => $unreadCount > 0,
            'unread_count' => $unreadCount,
        ]);
    }

    public function markAllAsRead(){
    $user = auth()->user();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $user->unreadNotifications->markAsRead();
    $message = "Hello from laravel";
    broadcast(new NotificationsMarkedAsRead($user->id));

    return response()->json(['message' => 'All notifications marked as read',$user]);
    }
}
