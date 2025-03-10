<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseFilter extends Model {
    use HasFactory;

    protected $fillable = ['course_id', 'filter_option_id'];
}
