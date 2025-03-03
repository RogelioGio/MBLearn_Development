<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    /** @use HasFactory<\Database\Factories\BranchFactory> */
    use HasFactory;
    protected $fillable = ['branch_name'];

    public function departments(): BelongsToMany{
        return $this->belongsToMany(Department::class, 'branch_department', 'branch_id', 'department_id');
    }

    public function city(): BelongsTo{
        return $this->belongsTo(City::class);
    }

    public function users(): HasMany{
        return $this->hasMany(UserInfos::class, 'branch_id');
    }
}
