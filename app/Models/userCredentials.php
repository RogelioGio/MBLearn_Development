<?php


namespace App\Models;


use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;


class UserCredentials extends Model implements Authenticatable
{
    use HasApiTokens,HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'userCredentials'; // Replace with your actual table name
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'MBemail',
        'password',
        'user_info_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //Abstract Functions
    public function getAuthIdentifierName()
    {
        return 'employeeID';  // Or 'id', depending on what your identifier column is
    }

    public function getAuthIdentifier()
    {
        return $this->employeeID;  // Use the employeeID as the unique identifier
    }

    public function getAuthPassword()
    {
        return $this->password;  // Return the password field
    }

    public function getRememberToken()
    {
        return null;  // Optional: You can implement this if you're using "remember me" functionality
    }

    public function setRememberToken($value)
    {
        // Optional: Implement if needed
    }

    public function getRememberTokenName()
    {
        return null;  // Optional: Implement if needed
    }

    public function getAuthPasswordName()
    {
        return null;
    }

    public function userInfos(): HasOne{
        return $this->hasOne(UserInfos::class, 'user_credentials_id','id');
    }

    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;
    public function permissions(): \Staudenmeir\EloquentHasManyDeep\HasManyDeep{
        return $this->hasManyDeep(Permission::class, [UserInfos::class, 'permission_userinfo'],
         ['permission_userinfo.userinfo_id', 'permission_userinfo.permission_id']);
    }

    public function permissionsRole():\Staudenmeir\EloquentHasManyDeep\HasManyDeep{
        return $this->hasManyDeep(Permission::class, [UserInfos::class, 'role_userinfo', Role::class, 'permission_role'],
        ['role_userinfo.userinfo_id', 'role_userinfo.role_id', 'permission_role.permission_id', 'permission_role.role_id' ]);
    }

}
