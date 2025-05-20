<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\City;
use App\Models\Department;
use App\Models\Division;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Section;
use App\Models\Title;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OptionController extends Controller
{
    public function index(){
        if(!Cache::has('options')){
            $options = Cache::remember('options', now()->addMinutes(60), function () {
                return [
                    'cities' => City::all(),
                    'departments' => Department::all(),
                    'location' => Branch::all(),
                    'titles' => Title::all(),
                    'roles' => Role::all()->load('permissions'),
                    'permission' => Permission::all(),
                    'division' => Division::all(),
                    'section' => Section::all(),
                ];
            });
            return response()->json($options);
        }
        $options = Cache::get('options');

        return response()->json($options);
    }
}
