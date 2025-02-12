<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FilterCategory;
use Illuminate\Http\Request;

class Filters extends Controller
{
    public function index(){
        $data = FilterCategory::all();
        dd($data);
    }
}
