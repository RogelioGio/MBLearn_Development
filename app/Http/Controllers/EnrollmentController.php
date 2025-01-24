<?php

namespace App\Http\Controllers;

use App\Http\Requests\enrollmentRequest;
use App\Models\Enrollment;
use App\Models\UserInfos;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    //Fetch Learners
    public function enrolees () {

        $learner = UserInfos::where('role', 'Learner')->get();
        \Log::info($learner);
        return response()->json($learner);
    }
}
