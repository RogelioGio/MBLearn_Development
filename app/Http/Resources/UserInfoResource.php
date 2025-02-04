<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'employeeID'=> $this->employeeID,
            'name'=> $this->name,
            'department'=> $this->department,
            'title' => $this->title,
            'branch'=> $this->branch,
            'city' => $this->city,
            'role' => $this->role,
            'status' => $this->status,
            'profile_image' => $this->profile_image,
        ];
    }
}
