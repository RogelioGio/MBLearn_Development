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
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Course::with(['categories', 'types', 'training_modes'])->where('archived', '=', 'active')->orderby('name', 'asc')->paginate(3);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request;
        $type = Type::query()->find($data['type_id']);
        $category = Category::query()->find($data['category_id']);
        $training_mode = Training_Mode::query()->find($data['training_mode_id']);
        $course_admin = UserInfos::query()->find($data['assigned_course_admin_id']);
        $current_user = Auth::user();

        
        $course = Course::create([
            "name" => $data['name'],
            "description" => $data['description'],
            "training_type" =>$data['training_type'],
            "system_admin_id" => $current_user->id,
            "archived" => $data['archived'],]
            );

        $course->training_modes()->syncWithoutDetaching($training_mode->id);
        $course->types()->syncWithoutDetaching($type->id);
        $course->categories()->syncWithoutDetaching($category->id);
        $course->assignedCourseAdmin()->associate($course_admin);
        $course->save();
        return response((new CourseResource($course))->toArray($request), 204);
    }

    public function bulkStore(BulkStoreCourseRequest $request){
        $bulk = collect($request->all())->map(function($arr, $key){
            return Arr::except($arr,['systemAdminId', 'assignedCourseAdminId']);
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

    public function getCourseUsers(Course $course){
        $users = $course->enrolledUsers;
        return $users;
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load(['categories', 'types', 'training_modes']);
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
        return response((new CourseResource($course))->toArray($request), 204);
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
