<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfos extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'userInfo'; // Replace with your actual table name

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employeeID',
        'name',
        'department',
        'title',
        'branch',
        'city',
        'role',
        'status',
        'profile_image',
        // Add all the column names you want to make mass-assignable
    ];
}
