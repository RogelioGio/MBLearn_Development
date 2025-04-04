<?php 

namespace App\helpers;

use App\Models\Activitylogs;
use Illuminate\Support\Facades\Auth;

class LogActivityHelper{
    public static function logActivity($action, $description = null, $target = null){
        Activitylogs::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'description' => $description,
            'target' => $target,
        ]);
    }
}

