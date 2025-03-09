<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;


use App\Models\Branch;
use App\Models\Category;
use App\Models\Category_Course;
use App\Models\City;
use App\Models\Department;
use App\Models\Training_Mode;
use App\Models\Type;
use Illuminate\Http\Request;

class CourseContextController extends Controller
{
    public function index(){
        return response() ->json([
            'coursetypes' => Type::all(),
            'coursecategories' => Category::all(),
            'trainingmodes' => Training_Mode::all(),
            'departments' => Department::all(),
            'cities' => City::all(),
            'branches' => Branch::all()
        ]);
    }
}
