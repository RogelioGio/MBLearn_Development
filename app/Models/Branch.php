<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Branch extends Model
{
    /** @use HasFactory<\Database\Factories\BranchFactory> */
    use HasFactory;
    protected $fillable = ['branch_name'];

    public function users(): BelongsToMany{
        return $this->belongsToMany(UserInfos::class, 'branch_user_info', 'branch_id', 'userinfo_id');
    }
}
