<?php

namespace App\Http\Controllers\Api;

use App\Filters\CourseFilter;
use App\Filters\CourseSort;
use App\Filters\UserInfosFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\BulkAssignCourseAdmins;
use App\Http\Requests\BulkStoreCourseRequest;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Category;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\LessonFile;
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
        $querySort = $sort->transform($builder, $request);

        $page = $request->input('page',1); // default page
        $perPage = $request->input('perPage', 3); // default per page

        if($request->has('type_id')){
            if(!($request->input('type_id')['eq'] === "")){
                $querySort->whereHas('types', function($subQuery) use ($request){
                    $subQuery->where('type_id', $request->input('type_id'));
                });
            }
        }

        if($request->has('category_id')){
            if(!($request->input('category_id')['eq'] === "")){
                $querySort->whereHas('categories', function($subQuery) use ($request){
                    $subQuery->where('category_id', $request->input('category_id'));
                });
            }
        }

        if($request->has('training_type')){
            if(!($request->input('training_type')['eq'] === "")){
                $querySort->where('training_type', $request->input('training_type'));
            }
        }

        $courses = $querySort->with(['categories', 'types', 'training_modes','adder'])->where('archived', '=', 'active')->paginate($perPage);

        return response() -> json([
            'data' => $courses,
            'total' => $courses->count(),
            'lastPage' => $courses->lastPage(),
            'currentPage' => $courses->currentPage(),
        ],200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->all();
        $type = Type::query()->firstOrCreate(["type_name" => $data['type_name']]);
        $category = Category::query()->firstOrCreate(["category_name" => $data['category_name']]);
        $current_user = Auth::user();

        $course = Course::create([
            "name" => $data['name'],
            "CourseID" => $data['CourseID'],
            "course_outcomes" => $data['course_outcomes'],
            "course_objectives" => $data['course_objectives'],
            "description" => $data['description'],
            "training_type" =>$data['training_type'],
            "system_admin_id" => $current_user->userInfos->id,
            "archived" => $data['archived'],
            "months" => $data['months'],
            "weeks" => $data["weeks"],
            "days" => $data['days']
            ]);

        foreach($data['lessons'] as $lessons){
            $lesson = Lesson::create(['lesson_name' => $lessons['LessonName'],
                        'lesson_content_as_json' => $lessons['LessonContentAsJSON']]);
            $course->lessons()->save($lesson);
            foreach($lessons['files'] as $files){
                $file = $request->file('lessons.*.files.*.file');
                $path = $file->store('/'.$course->name.'/'.$lesson->lesson_name, 'lessonfiles');
                $file = LessonFile::create(['file_name' => $files['file_name'], 'file_type' => $files['file_type'], 'file_path' => $path]);
                $file->lesson()->associate($lesson);
            }
        }

        $course->types()->syncWithoutDetaching($type->id);
        $course->categories()->syncWithoutDetaching($category->id);
        $course->save();
        return response()->json([
            "course" => $course->load(['lessons']),
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
        $acceptedEnrollmentFilter = ['enrolled', 'ongoing', 'finished'];

        $filter = new UserInfosFilter();
        $queryItems = $filter->transform($request);
        $lesson_count = $course->lessons()->count();

        $query = $course->enrollments()->whereHas('enrolledUser', function($subQuery) use($queryItems){
            $subQuery->where($queryItems)->where('status', '=', 'Active');
        });


        if($request->has('enrollment_status')){
            if(in_array($request->input('enrollment_status')['eq'],$acceptedEnrollmentFilter)){
                $query->where('enrollment_status', $request->input('enrollment_status')['eq']);
            }
        }
        $enrolls = $query->paginate($perPage);

        foreach($enrolls as $user){
            $user->enrolledUser->load(['division','department','section','city','branch']);
            $user->enrollment_status = $user->enrollment_status;
            $user->due_soon = $user->due_soon;
            $user->completed_percentage = round(($user->enrolledUser->lessons()->where('course_id', $course->id)->wherePivot('is_completed', true)->count() / $lesson_count) * 100, 2);
        }

        return response() -> json([
            'data' => $enrolls,
            'total' => $enrolls->total(),
            'lastPage' => $enrolls->lastPage(),
            'currentPage' => $enrolls->currentPage(),
        ]);
    }

    public function countCourseStatus(Course $course){
        $enrolled = $course->enrollments()->where('enrollment_status', 'enrolled')->count();
        $ongoing = $course->enrollments()->where('enrollment_status', 'ongoing')->count();
        $finished = $course->enrollments()->where('enrollment_status', 'finished')->count();

        return response()->json([
            'Enrolled' => $enrolled,
            'Ongoing' => $ongoing,
            'Finished' => $finished
        ]);
    }

    public function checkIfExist($courseId){
        $exists = Course::where('CourseID', $courseId)->exists();
        if($exists){
            return response()->json([
                'Error' => 'Course already exists.'
            ],409);
        }
        return response()->json([
            'message' => 'Course ID is available.'
        ], 200);
    }

    public function getAssignedCourseAdmin(Course $course, Request $request){
        $page = $request->input('page', 1); // default page
        $perPage = $request->input('per_page', 5); // default per page

        $admins = $course->assignedCourseAdmins()
        ->with(['branch', 'department', 'branch.city', 'title','division','section'])
        ->paginate($perPage);

        $main = $course->adder()->with(['branch', 'department', 'branch.city', 'title', 'division','section'])->get();

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
        $course->load(['categories', 'types', 'training_modes', 'lessons']);
        return $course;
    }

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
