<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:api']]);
Broadcast::channel('App.Models.UserCredentials.{id}', function ($user, $id) {
    Log::info('Broadcasting Auth Request', [
        'authenticated_user_id' => $user->id ?? null,
        'requested_id' => $id,
        'match' => ((int) $user->id === (int) $id),
    ]);

    return (int) $user->id === (int) $id;
});

Broadcast::channel('channel-name', function($user){
    return true;
});
