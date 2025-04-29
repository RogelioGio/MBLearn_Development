<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkFormInput;
use App\Models\Title;
use App\Http\Requests\StoreTitleRequest;
use App\Http\Requests\UpdateTitleRequest;
use Illuminate\Support\Facades\Gate;

class TitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Title::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTitleRequest $request)
    {
        $title = Title::create($request->validated());
        return $title;
    }

    public function bulkStore(BulkFormInput $request){
        $bulk = $request->validated();
        $test = [];
        foreach($bulk as $index => $output){
            $test[] = Title::create(['title_name' => $output["forminputname"]]);
        }
        return response()->json([
            "Titles" => $test
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Title $title)
    {
        return $title;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTitleRequest $request, Title $title)
    {
        $validated = $request->validated();
        $title->update($validated);
        return $title;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Title $title)
    {
        Gate::authorize('delete', Title::class);
        $title->delete();
        return response()->json([
            'message' => 'title removed'
        ]);
    }
}
