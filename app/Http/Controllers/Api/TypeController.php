<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTypeRequest;
use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Type::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTypeRequest $request)
    {
        $type = Type::create($request->validated());
        return $type;
    }

    /**
     * Display the specified resource.
     */
    public function show(Type $type)
    {
        return $type;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTypeRequest $request, Type $type)
    {
        $temp = $type->update($request->validated());
        return $temp;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        $type->delete();
        return response()->json([
            "Message" => "Type Deleted"
        ]);
    }
}
