<?php

namespace App\Http\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CarouselImage;
use App\Http\Requests\StoreCarouselImageRequest;
use App\Http\Requests\UpdateCarouselImageRequest;

class CarouselImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CarouselImage::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarouselImageRequest $request)
    {
        $validated = $request->validated();
        $file = $request->file('image');
        $path = $file->store('images', 'public');

        $carouselImage = CarouselImage::create([
            'image_name' => $validated['image_name'],
            'image_path' => $path,
        ]);
        return response()->json([
            'message' => 'Carousel image created successfully.',
            'carousel_image' => $carouselImage,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CarouselImage $carouselImage)
    {
        return $carouselImage;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarouselImageRequest $request, CarouselImage $carouselImage)
    {
        $validated = $request->validated();
        $file = $request->file('image');
        $path = $file->store('images', 'public');   

        $carouselImage->update([
            'image_name' => $validated['image_name'],
            'image_path' => $path
        ]);
        return response()->json([
            'message' => 'Carousel image updated successfully.',
            'carousel_image' => $carouselImage,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarouselImage $carouselImage)
    {
        $carouselImage->delete();
        return response()->json(['message' => 'Carousel image deleted successfully.'], 200);
    }
}
