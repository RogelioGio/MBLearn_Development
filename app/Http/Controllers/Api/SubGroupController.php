<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubGroup;
use App\Http\Requests\StoreSubGroupRequest;
use App\Http\Requests\UpdateSubGroupRequest;

class SubGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SubGroup::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubGroupRequest $request)
    {
        $validated = $request->validated();
        return SubGroup::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubGroup $subGroup)
    {
        return $subGroup;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubGroupRequest $request, SubGroup $subGroup)
    {
        $validated = $request->validated();
        $subGroup->update($validated);
        return $subGroup;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubGroup $subGroup)
    {
        $subGroup->delete();
        return response()->json([
            "Message" => "Subgroup Deleted"
        ]);
    }
}
