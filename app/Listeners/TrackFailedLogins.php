<?php

namespace App\Listeners;

use App\Models\UserInfos;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class TrackFailedLogins
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $key = 'login-attempts:' . Str::lower($event->credentials['email']);
        
        if(RateLimiter::tooManyAttempts($key,5)){
            $user = UserInfos::where('MBemail', $event->credentials['email'])->first();
            if($user){
                $user->userInfos->update(['status' => 'Inactive']);
            }
        }
    }
}
