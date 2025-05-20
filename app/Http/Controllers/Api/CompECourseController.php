<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompECourse;
use Illuminate\Http\Request;

class CompECourseController extends Controller
{
    public function index(){
        return CompECourse::with('category', 'lessons')->get();
    }
}
