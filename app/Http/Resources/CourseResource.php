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
            'name'=>$this->name,
            'code'=>$this->code,
            'description' => $this->description,
            'type'=> $this->type,
            'trainingMode' => $this->training_mode,
            'mandatory'=> $this->mandatory,
            'duration'=> $this->duration,
            'archived'=>$this->archived,
        ];
    }
}
