<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lessons extends Model
{
    /** @use HasFactory<\Database\Factories\LessonsFactory> */
    use HasFactory;

    public $fillable = ["lesson_name", "lesson_content_as_json"];

    public function course(): BelongsTo{
        return $this->belongsTo(Course::class);
    }
}
