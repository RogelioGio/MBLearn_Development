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
            'name' => 'required',
            'description' => 'required',
            'type_id' => 'required',
            'category_id'=> 'required',
            'training_mode_id' => 'required',
            'training_type' => 'required',
            'archived' => 'required',
            'assignedCourseAdminId' => 'required|integer',
        ];
    }

    public function prepareforValidation(){
        $this->merge([
            'assigned_course_admin_id'=>$this->assignedCourseAdminId,
        ]);
    }
}
