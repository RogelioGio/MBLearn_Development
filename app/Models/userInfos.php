<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Mockery\Generator\StringManipulation\Pass\Pass;

class UserInfos extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'userInfo'; // Replace with your actual table name

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employeeID',
        'name',
        'department',
        'title',
        'branch',
        'city',
        'status',
        'profile_image',
        'user_credentials_id',
    ];

    public function userCredentials(): BelongsTo{
        return $this->belongsTo(UserCredentials::class, 'user_credentials_id', 'id');
    }

    //Functions for relationships
    public function enrollments(): HasMany{
        return $this->hasMany(Enrollment::class, 'user_id');
    }

    //TODO change name to be more clear, for knowing who made the enrollment
    public function enrollings(): HasMany{
        return $this->hasMany(Enrollment::class, 'enroller_id');
    }

    public function addedCourses(): HasMany{
        return $this->hasMany(Course::class, 'system_admin_id');
    }

    public function assignedCourses(): HasMany{
        return $this->hasMany(Course::class, 'assigned_course_admin_id');
    }


    public function roles(): BelongsToMany{
        return $this->belongsToMany(Role::class, 'role_userinfo', 'userinfo_id', 'role_id');
    }

    public function permissions(): BelongsToMany{
        return $this->belongsToMany(Permission::class, 'permission_userinfo', 'userinfo_id', 'permission_id');
    }
}
