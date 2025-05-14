<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    /** @use HasFactory<\Database\Factories\LessonsFactory> */
    use HasFactory;

    public $fillable = ["lesson_name", "lesson_content_as_json", 'lesson_type'];

    public function course(): BelongsTo{
        return $this->belongsTo(Course::class);
    }

    public function files(): HasMany{
        return $this->hasMany(LessonFile::class, 'lesson_id');
    }

    public function learners(): BelongsToMany{
        return $this->belongsToMany(UserInfos::class, 'learner_progress', 'lesson_id', 'userInfo_id')
            ->withPivot('is_completed')
            ->withTimestamps();
    }
}
