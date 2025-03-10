<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\City;
use App\Models\Department;
use App\Models\Role;
use App\Models\Title;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function index(){
        return response() ->json([
            'cities' => City::all(),
            'departments' => Department::all(),
            'location' => Branch::all(),
            'titles' => Title::all(),
            'roles' => Role::all(),
        ]);
    }
}
