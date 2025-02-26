<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class City extends Model
{
    /** @use HasFactory<\Database\Factories\CityFactory> */
    use HasFactory;
    protected $fillable = ['city_name'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(UserInfos::class, 'city_user_info', 'city_id', 'userinfo_id' );
    }
}
