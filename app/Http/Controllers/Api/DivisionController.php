<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkFormInput;
use App\Models\Division;
use App\Http\Requests\StoreDivisionRequest;
use App\Http\Requests\UpdateDivisionRequest;
use App\Jobs\ResetOptionCache;
use Illuminate\Support\Facades\Gate;

class DivisionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Division::query()->orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDivisionRequest $request)
    {
        $validated = $request->validated();
        ResetOptionCache::dispatch();
        return Division::create($validated);
    }

    public function bulkStore(BulkFormInput $request){
        $bulk = $request->validated();
        $test = [];
        foreach($bulk as $index => $output){
            $test[] = Division::create(['division_name' => $output["forminputname"]]);
        }
        return response()->json([
            "Divisions" => $test
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Division $division)
    {
        return $division;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDivisionRequest $request, Division $division)
    {
        $validated = $request->validated();
        $division->update($validated);
        return $division;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Division $division)
    {
        Gate::authorize('delete', Division::class);
        $division->delete();
        return response()->json([
            'meesage' => 'Division Deleted'
        ]);
    }
}
