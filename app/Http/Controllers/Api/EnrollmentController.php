<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkStoreEnrollmentRequest;
use App\Http\Requests\GetEndDatesRequest;
use App\Http\Requests\StoreEnrollmentRequest;
use App\Http\Requests\UpdateEnrollmentRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\EnrollmentResource;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Pagination;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;



class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EnrollmentResource::collection(Enrollment::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnrollmentRequest $request)
    {
        $data = $request->validated();
        $enrollment = Enrollment::firstOrCreate($data);
        return new EnrollmentResource($enrollment);
    }

    public function bulkStore(BulkStoreEnrollmentRequest $request){
        $bulk = $request->validated();
        $test = [];

        foreach($bulk as $index => $dat){
            $exists = Enrollment::query()->where([
                ['user_id', '=', $dat['user_id']],
                ['course_id', '=', $dat['course_id']],
            ])->exists();

            if(!$exists){
                $test[] = Enrollment::firstOrCreate($dat);
            } else{
                $test[] = ["Message" => $dat['user_id']." is already enrolled in ".$dat['course_id']];
            }
        }
 
        // Enrollment::insert($bulk->toArray());
        return response()->json([
            "Message" => "Bulk Store complete",
            "Data" => $test
        ]);
    }

    public function getEndDate(GetEndDatesRequest $request){
        $bulk = $request->validated();
        $test = [];
    }

    //Fetch Learners
    //The role names are inside of 2D array []["role_name"] to get role name
    public function enrolees(Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $learner = UserInfos::with('roles', 'department', 'title', 'city', 'branch')->paginate($perPage);
        Log::info($learner);
        return response()->json([
            'data' => $learner->items(),
            'total' => $learner->total(),
            'lastPage' => $learner->lastPage(),
            'currentPage' => $learner->currentPage()
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollment $enrollment)
    {
        return new EnrollmentResource($enrollment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnrollmentRequest $request, Enrollment $enrollment)
    {
        $temp = $enrollment->update($request->all());

        return new EnrollmentResource($temp);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollment $enrollment)
    {
        //
    }
}
