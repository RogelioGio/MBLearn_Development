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
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CourseContextController extends Controller
{
    public function index(){
        return response() ->json([
            'coursetypes' => Type::all(),
            'coursecategories' => Category::all(),
            'trainingmodes' => Training_Mode::all(),
            'departments' => Department::all(),
            'cities' => City::all(),
            'branches' => Branch::all(),
            'divisions' => Division::all(),
            'sections' => Section::all(),
        ]);
    }

    public function getSelectedCourse($id){
        $course = Course::with('adder', 'assignedCourseAdmins','categories','types','training_modes')->find($id);
        $course->adder->load(['branch', 'department', 'branch.city', 'title']);
        $course->assignedCourseAdmins->load(['branch', 'department', 'branch.city', 'title']);
        if ($course) {
            return response()->json($course);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }
}
