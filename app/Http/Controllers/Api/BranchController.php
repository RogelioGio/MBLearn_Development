<?php

namespace App\Http\Controllers\Api;

use App\Filters\BranchFilter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\BulkFormInput;
use App\Http\Requests\CityBranchRequest;
use App\Models\Branch;
use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\City;
use App\Models\Department;
use Illuminate\Support\Facades\Gate;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new BranchFilter();
        $queryItems = $filter->transform($request);

        if(count($queryItems) > 0){
            return Branch::where($queryItems)->orderBy('created_at', 'desc')->get();
        }
        return Branch::query()->orderBy('created_at', 'desc')->get();
    }

    public function bulkStore(BulkFormInput $request){
        $bulk = $request->validated();
        $test = [];
        foreach($bulk as $index => $output){
            $test[] = Branch::create(['branch_name' => $output["forminputname"]]);
        }
        return response()->json([
            "Branches" => $test
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBranchRequest $request)
    {
        $validated = $request->validated();
        $city = City::find($validated['city_id']);
        $branch = Branch::create(["branch_name" => $validated['branch_name']]);
        $branch->city()->associate($city);
        $branch->save();
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

    public function addCity(CityBranchRequest $request){
        $validated = $request->validated();
        $branch = Branch::find($validated['branch_id']);
        $city = City::find($validated['city_id']);
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
        Gate::authorize('delete', Branch::class);
        $branch->delete();
        return response()->json([
            "message" => "Branch Deleted"
        ]);
    }
}
