<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarouselImage extends Model
{
    /** @use HasFactory<\Database\Factories\CarouselImageFactory> */
    use HasFactory;

    public $fillable = [
        'image_name',
        'image_path',
    ];
}
