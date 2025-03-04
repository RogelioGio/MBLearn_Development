<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    protected $fillable = ['category_name'];

    public function Courses():BelongsToMany{
        return $this->belongsToMany(Course::class, 'category__course', 'category_id', 'course_id');
    }
}
