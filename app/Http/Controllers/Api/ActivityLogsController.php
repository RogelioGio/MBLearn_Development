<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Activitylogs;

class ActivityLogsController extends Controller
{
    public function index()
    {
        $activityLogs = Activitylogs::all();
        return response()->json($activityLogs);
    }
}
