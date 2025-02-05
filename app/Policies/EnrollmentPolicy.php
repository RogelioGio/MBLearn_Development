<?php

namespace App\Policies;

use App\Models\Enrollment;
use App\Models\UserCredentials;
use Illuminate\Auth\Access\Response;

class EnrollmentPolicy
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
    public function view(UserCredentials $userCredentials, Enrollment $enrollment): bool
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
    public function update(UserCredentials $userCredentials, Enrollment $enrollment): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(UserCredentials $userCredentials, Enrollment $enrollment): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(UserCredentials $userCredentials, Enrollment $enrollment): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(UserCredentials $userCredentials, Enrollment $enrollment): bool
    {
        return false;
    }
}
