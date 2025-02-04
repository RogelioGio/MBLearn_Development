<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserCredentialsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'employeeID' => $this->employeeID,
            'name'=> $this->name,
            'MBemail'=> $this->MBemail,
            'role'=> $this->role,
        ];
    }
}
