<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:sanctum']]);
Broadcast::channel('App.Models.UserCredentials.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('notifications.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

Broadcast::channel('channel-name', function($user){
    return true;
});

Broadcast::channel('Users', function ($user){
    return $user->userInfos->roles[0]->role_name === "System Admin";
});
