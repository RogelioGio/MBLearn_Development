<?php 

namespace App\helpers;

use App\Models\Activitylogs;
use Illuminate\Support\Facades\Auth;

class LogActivityHelper{
    public static function logActivity($action, $user_name, $description = null, $target = null){
        Activitylogs::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'user_name' => $user_name,
            'description' => $description,
            'target' => $target,
        ]);
    }
}

