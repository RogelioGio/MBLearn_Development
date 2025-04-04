<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Permission extends Model
{
    protected $fillable = ['permission_name'];

    public function users():BelongsToMany{
        return $this->belongsToMany(Permission::class, 'permission_userinfo', 'permission_id', 'userinfo_id');
    }

}
