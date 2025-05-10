<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // TODO be more specific
        return [
            "name" => "required|unique:courses,name",
            "CourseID" => "required|unique:courses,CourseID",
            "course_outcomes" => "required|string",
            "course_objectives" => "required|string",
            "description" => "required",
            "type_name" => "required|string",
            "category_name"=> "required|string",
            "training_type" => "required",
            "months" => "nullable|integer",
            "weeks" => "nullable|integer",
            "days" => "nullable|integer",
            "archived" => "required",
        ];
    }

    public function prepareforValidation(){
        $this->merge([
            "assigned_course_admin_id"=>$this->assignedCourseAdminId,
        ]);
    }
}
