<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkStoreEnrollmentRequest;
use App\Http\Requests\StoreEnrollmentRequest;
use App\Http\Requests\UpdateEnrollmentRequest;
use App\Http\Resources\EnrollmentResource;
use App\Models\Enrollment;
use App\Models\UserInfos;
use Illuminate\Http\Request;
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
        $enrollment = Enrollment::create($request->all());
        return new EnrollmentResource($enrollment);
    }

    public function bulkStore(BulkStoreEnrollmentRequest $request){
        $bulk = collect($request->all())->map(function($arr, $key){
            return Arr::except($arr,['userId', 'courseId', 'enrollerId']);
        });

        Enrollment::insert($bulk->toArray());
        return response()->json([
            "Message" => "Bulk Store complete",
            "Data" => $bulk
        ]);
    }

    //Fetch Learners
    public function enrolees(Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $learner = UserInfos::where('role', 'learner')->paginate($perPage);
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
