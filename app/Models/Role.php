<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = ['role_name'];

    public function users(): BelongsToMany{
        return $this->BelongsToMany(UserInfos::class, 'role_userinfo', 'role_id', 'userinfo_id');
    }
}
