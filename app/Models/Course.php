<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Znck\Eloquent\Relations\BelongsToThrough;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'CourseID',
        'description',
        'training_type',
        'type_id',
        'category_id',
        'archived',
        'months',
        'weeks',
        'days',
        'system_admin_id',
        'assigned_course_admin_id',
    ];

    public function enrollments(): HasMany{
        return $this->hasMany(Enrollment::class);
    }

    public function enrolledUsers(): HasManyThrough{
        return $this->hasManyThrough(UserInfos::class, Enrollment::class, 'course_id', 'id', 'id', 'user_id');
    }

    public function statusEnrolledUsers(){
        return $this->enrollments()->with('enrolledUser')->get()->map(function ($enrollment){
            $user = $enrollment->enrolledUser;
            $user->enrollment_status = $enrollment->enrollment_status;
            $user->due_soon = $enrollment->due_soon;
            return $user;
        });
    }

    //help with better name, basically system admin na nag add ng course
    public function adder(): BelongsTo{
        return $this->belongsTo(UserInfos::class, 'system_admin_id', 'id');
    }

    //IDK if multiple course admin can be assigned to a course, subject to change
    public function assignedCourseAdmins(): BelongsToMany{
        return $this->belongsToMany(UserInfos::class, 'course_userinfo_assignment', 'course_id', 'user_id');
    }

    public function categories():BelongsToMany{
        return $this->belongsToMany(Category::class, 'category__course', 'course_id', 'category_id');
    }

    public function types():BelongsToMany{
        return $this->belongsToMany(Type::class, 'type_course', 'course_id', 'type_id');
    }

    public function training_modes():BelongsToMany{
        return $this->belongsToMany(Training_Mode::class, 'traning__mode__course', 'course_id', 'training_mode_id');
    }

}
