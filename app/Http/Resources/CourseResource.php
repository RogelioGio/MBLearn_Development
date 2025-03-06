<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //TODO add a way to see the course admin that is assigned and who added the course
        return [
            'id'=> $this->id,
            'name'=>$this->name,
            'description' => $this->description,
            'type'=> $this->types->pluck('type_name')->toArray(),
            'category'=> $this->categories->pluck('category_name')->toArray(),
            'trainingMode' => $this->training_modes->pluck('mode_name')->toArray(),
            'training_type'=> $this->training_type,
            'duration'=> $this->duration,
            'archived'=>$this->archived,
        ];
    }
}
