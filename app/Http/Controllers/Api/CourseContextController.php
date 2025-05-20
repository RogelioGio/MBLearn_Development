<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Category_Course;
use App\Models\City;
use App\Models\Course;
use App\Models\Department;
use App\Models\Division;
use App\Models\Section;
use App\Models\Training_Mode;
use App\Models\Type;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class CourseContextController extends Controller
{
    public function index(){
        if(!Cache::has('course_context')){
            $inputs = Cache::remember('course_context', now()->addMinutes(60), function () {
                return [
                    'coursetypes' => Type::all(),
                    'coursecategories' => Category::all(),
                    'departments' => Department::all(),
                    'cities' => City::all(),
                    'branches' => Branch::all(),
                    'divisions' => Division::all(),
                    'sections' => Section::all(),
                ];
            });
            return response()->json($inputs);
        }
        $inputs = Cache::get('course_context');

        return response()->json($inputs);
    }

    public function getSelectedCourse($id, UserInfos $userInfos){
        $course = Course::with('adder', 'assignedCourseAdmins','categories','types','training_modes', 'lessons')->find($id);
        $course->completed_count = $userInfos->lessons()->where('course_id', $id)->wherePivot('is_completed', true)->count();
        $course->completed_lessons = $userInfos->lessons()->where('course_id', $id)->wherePivot('is_completed', true)->pluck('lessons.id');
        $course->adder->load(['branch', 'department', 'branch.city', 'title']);
        $course->assignedCourseAdmins->load(['branch', 'department', 'branch.city', 'title']);
        //$main = $course->adder()->with(['branch', 'department', 'branch.city', 'title'])->get();
        if ($course) {
            return response()->json($course);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }

        public function adminGetSelectedCourse($id){
        $course = Course::with('adder', 'assignedCourseAdmins','categories','types','training_modes', 'lessons')->find($id);
        $course->adder->load(['branch', 'department', 'branch.city', 'title']);
        $course->assignedCourseAdmins->load(['branch', 'department', 'branch.city', 'title']);
        //$main = $course->adder()->with(['branch', 'department', 'branch.city', 'title'])->get();
        if ($course) {
            return response()->json($course);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }
}
