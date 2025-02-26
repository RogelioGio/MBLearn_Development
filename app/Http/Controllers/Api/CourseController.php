<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkStoreCourseRequest;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\UserCredentialsResource;
use App\Models\Category;
use App\Models\Course;
use App\Models\Training_Mode;
use App\Models\Type;
use App\Models\UserCredentials;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CourseResource::collection(Course::query()->where('archived', '=', 'active')->orderby('name', 'asc')->paginate(3));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->all());
        return response(new CourseResource($course), 204);
    }

    public function bulkStore(BulkStoreCourseRequest $request){
        $bulk = collect($request->all())->map(function($arr, $key){
            return Arr::except($arr,['trainingMode', 'systemAdminId', 'assignedCourseAdminId']);
        });

        Course::insert($bulk->toArray());
        return response()->json([
            "Message" => "Bulk Store complete",
            "Data" => $bulk
        ]);
    }

    //You add course id then mode/category/type id in url
    public function addTrainingMode(Course $course, Training_Mode $training_Mode){
        $course->training_modes()->attach($training_Mode->id);
        return response()->json([
            "Message" => "Training Mode Added",
            "Data" => $course
        ]);
    }

    public function removeTrainingMode(Course $course, Training_Mode $training_Mode){
        $course->training_modes()->detach($training_Mode->id);
        return response()->json([
            "Message" => "Training Mode Removed",
            "Data" => $course
        ]);
    }

    public function addCategory(Course $course, Category $category){
        $course->categories()->attach($category->id);
        return response()->json([
            "Message" => "Category Added",
            "Data" => $course
        ]);
    }

    public function removeCategory(Course $course, Category $category){
        $course->categories()->detach($category->id);
        return response()->json([
            "Message" => "Category Removed",
            "Data" => $course
        ]);
    }

    public function addType(Course $course, Type $type){
        $course->types()->attach($type->id);
        return response()->json([
            "Message" => "Type Added",
            "Data" => $course
        ]);
    }

    public function removeType(Course $course, Type $type){
        $course->types()->detach($type->id);
        return response()->json([
            "Message" => "Type Removed",
            "Data" => $course
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        return new CourseResource($course);
    }


    //TODO FIX 
    // public function showEnrolledUsers(Course $course){
    //     return UserCredentialsResource::collection($course->enrolledUsers);
    // }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $temp = $course->update($request->all());
        return response(new CourseResource($temp), 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $temp = $course->toArray();
        $temp["archived"] = "archived";
        $course->update($temp);

        return response()->json([
            $temp
        ]);
    }
}
