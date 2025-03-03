<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Department extends Model
{
    /** @use HasFactory<\Database\Factories\DepartmentFactory> */
    use HasFactory;
    use \Znck\Eloquent\Traits\BelongsToThrough;
    protected $fillable = ['department_name'];

    public function users(): HasMany{
        return $this->hasMany(UserInfos::class, 'department_id');
    }

    public function branches(): BelongsToMany{
        return $this->belongsToMany(Branch::class, 'branch_department', 'department_id', 'branch_id');
    }

    
    public function city(): \Znck\Eloquent\Relations\BelongsToThrough{
        return $this->belongsToThrough(City::class, Branch::class, 'branch_id', 'country_id', 'branch_department');
    }
}
