<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkFormInput;
use App\Models\City;
use App\Http\Requests\StoreCityRequest;
use App\Http\Requests\UpdateCityRequest;
use App\Jobs\ResetOptionCache;
use Illuminate\Support\Facades\Gate;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return City::query()->orderBy('created_at', 'desc')->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCityRequest $request)
    {
        $validated = $request->validated();
        $city = City::create($validated);
        ResetOptionCache::dispatch();
        return $city;
    }

    public function bulkStore(BulkFormInput $request){
        $bulk = $request->validated();
        $test = [];
        foreach($bulk as $index => $output){
            $test[] = City::create(['city_name' => $output["forminputname"]]);
        }
        return response()->json([
            "Cities" => $test
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        return $city;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCityRequest $request, City $city)
    {
        $validatedData = $request->validated();
        $city->update($validatedData);
        return $city;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        Gate::authorize('delete', City::class);
        $city->delete();
        return response()->json([
            "message" => "City Deleted"
        ]);
    }
}
