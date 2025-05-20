<?php 

namespace App\helpers;

use App\Models\Branch;
use App\Models\City;
use App\Models\Department;
use App\Models\Division;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Section;
use App\Models\Title;
use Illuminate\Support\Facades\Cache;

class OptionCacheHelper{
    public static function CacheOptions(){
        $options = Cache::rememberforever('options', function(){
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
        return $options;
    }
}

