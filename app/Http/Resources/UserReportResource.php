<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "employeeID" => $this->employeeID,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "middle_name" => $this->middle_name,
            "name_suffix" => $this->name_suffix,
            "status" => $this->status,
            "MBemail" => optional($this->userCredentials)->MBemail,
            "Role" => $this->roles->pluck('role_name'),
            "Branch" => optional($this->branch)->branch_name,
            "Title" => optional($this->title)->title_name,
            "Department" => optional($this->department)->department_name,
            "City" => optional($this->city)->city_name,
            "Section" => optional($this->section)->section_name,
        ];
    }
}
