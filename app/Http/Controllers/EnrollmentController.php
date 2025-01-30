<?php

namespace App\Http\Controllers;

use App\Http\Requests\enrollmentRequest;
use App\Models\Enrollment;
use App\Models\UserInfos;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    //Fetch Learners
    public function enrolees (Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $learner = UserInfos::where('role', 'Learner')->paginate($perPage);
        \Log::info($learner);
        return response()->json([
            'data' => $learner->items(),
            'total' => $learner->total(),
            'lastPage' => $learner->lastPage(),
            'currentPage' => $learner->currentPage()
        ],200);
    }
}
