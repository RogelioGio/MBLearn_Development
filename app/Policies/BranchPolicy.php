<?php

namespace App\Policies;

use App\Models\Branch;
use App\Models\UserCredentials;
use Illuminate\Auth\Access\Response;

class BranchPolicy
{
    public function before(UserCredentials $userCredentials): bool|null{
        if($userCredentials->userInfos->status === "Active"){
            return true;
        }
        return false;
    }
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(UserCredentials $userCredentials): bool
    {
        $arrays = $userCredentials->permissions->toArray();
        $perm_names = [];
        foreach($arrays as $array){
            $perm_names[] = $array["permission_name"];
        }
        return in_array("AddFormInput", $perm_names);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(UserCredentials $userCredentials, Branch $branch): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(UserCredentials $userCredentials): bool
    {
        $arrays = $userCredentials->permissions->toArray();
        $perm_names = [];
        foreach($arrays as $array){
            $perm_names[] = $array["permission_name"];
        }
        return in_array("AddFormInput", $perm_names);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(UserCredentials $userCredentials): bool
    {
        $arrays = $userCredentials->permissions->toArray();
        $perm_names = [];
        foreach($arrays as $array){
            $perm_names[] = $array["permission_name"];
        }
        return in_array("EditFormInput", $perm_names);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(UserCredentials $userCredentials): bool
    {
        $arrays = $userCredentials->permissions->toArray();
        $perm_names = [];
        foreach($arrays as $array){
            $perm_names[] = $array["permission_name"];
        }
        return in_array("DeleteFormInput", $perm_names);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(UserCredentials $userCredentials, Branch $branch): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(UserCredentials $userCredentials, Branch $branch): bool
    {
        return false;
    }
}
