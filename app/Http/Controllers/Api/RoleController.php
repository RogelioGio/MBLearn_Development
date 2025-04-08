<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRolePermissionRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\UserInfos;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'roles' => Role::withCount('users')->with('permissions')->get(),
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $role = Role::create($request->all());
        return $role;
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return $role;
    }

    public function updateRolePermissions(UpdateRolePermissionRequest $request, Role $role){
        
        $bulk = collect($request->all())->map(function($arr, $key){
            $test = [];
            foreach($arr as $key => $value){
                $test = $value;
            }
            return $test;
        });

        $role->permissions()->sync($bulk);
        
        return response()->json([
            "message" => $role->load(['permissions'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRoleRequest $request, Role $role)
    {
        $temp = $role->update($request->all());
        return $temp;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
    }
}
