<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activitylogs extends Model
{
    protected $fillable = ["user_id", "action", "description", "target"];

    public function user():BelongsTo{
        return $this->belongsTo(UserInfos::class);
    }
}
