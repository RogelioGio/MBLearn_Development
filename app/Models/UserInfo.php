<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'userinfo';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'department',
        'title',
        'branch',
        'city',
        'role',
        'status',
        'profile_image',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'status' => 'string', // Enum fields can be cast as strings
    ];
}
