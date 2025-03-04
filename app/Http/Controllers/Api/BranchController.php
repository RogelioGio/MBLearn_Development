<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\City;
use App\Models\Department;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Branch::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBranchRequest $request)
    {
        $validated = $request->validated();
        $branch = Branch::create($validated);
        return $branch;
    }

    public function addDepartment(Branch $branch, Department $department){
        $branch->departments()->syncWithoutDetaching($department->id);
        return response()->json([
            "Message" => "Branch Attached",
            "Data" => $department,
            "Roles" => $department->branches,
        ]);
    }

    public function addCity(Branch $branch, City $city){
        $branch->city()->associate($city);
        $branch->save();
        return response()->json([
            "Message" => "City Attached",
            "Data" => $branch,
            "City" => $branch->city,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        return $branch;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $validated = $request->validated();
        $branch->update($validated);
        return $branch;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();
        return response()->json([
            "message" => "Branch Deleted"
        ]);
    }
}
