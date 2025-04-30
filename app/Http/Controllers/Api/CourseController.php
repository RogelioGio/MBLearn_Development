<?php

namespace App\Http\Controllers\Api;

use App\Filters\CourseFilter;
use App\Filters\CourseSort;
use App\Http\Controllers\Controller;
use App\Http\Requests\BulkAssignCourseAdmins;
use App\Http\Requests\BulkStoreCourseRequest;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Category;
use App\Models\Course;
use App\Models\Training_Mode;
use App\Models\Type;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;


class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CourseFilter();
        $sort = new CourseSort();
        $builder = Course::query();
        $queryItems = $filter->transform($request);
        $querySort = $sort->transform($builder, $request);

        // $page = $request->input('page',1); // default page
        // $perPage = $request->input('per_page', 3); // default per page

        $courses = $querySort->with(['categories', 'types', 'training_modes'])->where('archived', '=', 'active')->get();

        return response() -> json([
            'data' => $courses,
            'total' => $courses->count(),
            // 'lastPage' => $courses->lastPage(),
            // 'currentPage' => $courses->currentPage(),
        ],200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->all();
        $type = Type::query()->find($data['type_id']);
        $category = Category::query()->find($data['category_id']);
        $current_user = Auth::user();

        $course = Course::create([
            "name" => $data['name'],
            "CourseID" => $data['CourseID'],
            "description" => $data['description'],
            "training_type" =>$data['training_type'],
            "system_admin_id" => $current_user->userInfos->id,
            "archived" => $data['archived'],
            "months" => $data['months'],
            "weeks" => $data["weeks"],
            "days" => $data['days']
            ]);

        $course->types()->syncWithoutDetaching($type->id);
        $course->categories()->syncWithoutDetaching($category->id);
        $course->save();
        return response()->json([
            "course" => $course,
            "types" => $course->types,
            "categories" => $course->categories,
        ], 200);
    }

    public function bulkStore(BulkStoreCourseRequest $request){
        $bulk = collect($request->all())->map(function($arr, $key){
            return $arr;
        });

        Course::insert($bulk->toArray());
        return response()->json([
            "Message" => "Bulk Store complete",
            "Data" => $bulk
        ]);
    }

    public function assignCourseAdmin(BulkAssignCourseAdmins $bulkAssignCourseAdmins, Course $course){
        $bulk = collect($bulkAssignCourseAdmins->all())->map(function($arr, $key){
            $messyArray = [];
            foreach($arr as $key => $value){
                $temp = UserInfos::find($value);
                $roles = $temp->roles->toArray();
                foreach($roles as $role)
                if(in_array('Course Admin',$role) || in_array('System Admin', $role)){
                    $messyArray = $value;
                }
            }
            return $messyArray;
        });
        $course->assignedCourseAdmins()->syncWithoutDetaching($bulk);
        return response()->json([
            'message' => "Course Admins assigned to ".$course->name
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

    public function getCourseUsers(Course $course, Request $request){
        $page = $request->input('page', 1); // default page
        $perPage = $request->input('per_page', 8); // default per page

        $users = $course->enrolledUsers()->with(['division','department','section','city','branch'])->paginate($perPage);

        return response() -> json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage(),
        ]);
    }

    public function getAssignedCourseAdmin(Course $course, Request $request){
        // $perPage = 5;
        // $currentPage = request()->get('page', 1);

        // $admins = $course->assignedCourseAdmins->load(['branch', 'department', 'branch.city', 'title']);
        // $userCollection = collect($admins);

        // $paginatedAdmins = new LengthAwarePaginator(
        //     $userCollection->forPage($currentPage, $perPage),
        //     $userCollection->count(),
        //     $perPage,
        //     $currentPage,
        //     ['path' => request()->url()]
        // );


        //return $paginatedAdmins;

        $page = $request->input('page', 1); // default page
        $perPage = $request->input('per_page', 5); // default per page

        $admins = $course->assignedCourseAdmins()
        ->with(['branch', 'department', 'branch.city', 'title',])
        ->paginate($perPage);

        $main = $course->adder()->with(['branch', 'department', 'branch.city', 'title'])->get();

        return response()->json([
            'data' => $admins->items(),
            'main' => $main,
            'total' => $admins->total(),
            'lastPage' => $admins->lastPage(),
            'currentPage' => $admins->currentPage(),
        ], 200);

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
        $temp["training_type"] = "archived";
        $course->update($temp);

        return response()->json([
            $temp
        ]);
    }
}
