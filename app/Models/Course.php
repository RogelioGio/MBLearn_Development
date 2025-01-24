<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'type',
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


    //help with better name, basically system admin na nag add ng course
    public function adder(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    //IDK if multiple course admin can be assigned to a course subject to change
    public function assignedCourseAdmin(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
