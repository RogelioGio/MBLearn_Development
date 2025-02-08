<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Znck\Eloquent\Relations\BelongsToThrough;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'category',
        'training_mode',
        'mandatory',
        'duration',
        'archived',
        'system_admin_id',
        'assigned_course_admin_id',
    ];

    public function enrollments(): HasMany{
        return $this->hasMany(Enrollment::class);
    }

    public function enrolledUsers(): BelongsToThrough{
        return $this->BelongsToThrough(UserCredentials::class, Enrollment::class);
    }

    //help with better name, basically system admin na nag add ng course
    public function adder(): BelongsTo{
        return $this->belongsTo(UserCredentials::class);
    }

    //IDK if multiple course admin can be assigned to a course subject to change
    public function assignedCourseAdmin(): BelongsTo{
        return $this->belongsTo(UserCredentials::class);
    }
}
