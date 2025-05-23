<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    /** @use HasFactory<\Database\Factories\EnrollmentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'enroller_id',
        'enrollment_status',
        'due_soon',
        'start_date',
        'end_date',
    ];

    public function enrolledUser(): BelongsTo{
        return $this->belongsTo(UserInfos::class, 'user_id', 'id');
    }

    public function course(): BelongsTo{
        return $this->belongsTo(Course::class);
    }

    public function enroller(): BelongsTo{
        return $this->belongsTo(UserInfos::class, 'enroller_id', 'id');
    }
}