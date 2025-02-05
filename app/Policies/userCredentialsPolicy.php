<?php

namespace App\Policies;

use App\Models\UserCredentials;
use Illuminate\Auth\Access\Response;

class userCredentialsPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(UserCredentials $userCredentials): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(UserCredentials $userCredentials, UserCredentials $userCredentialsCredentials): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(UserCredentials $userCredentials): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(UserCredentials $userCredentials, UserCredentials $userCredentialsCredentials): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(UserCredentials $userCredentials, UserCredentials $userCredentialsCredentials): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(UserCredentials $userCredentials, UserCredentials $userCredentialsCredentials): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(UserCredentials $userCredentials, UserCredentials $userCredentialsCredentials): bool
    {
        return false;
    }
}
