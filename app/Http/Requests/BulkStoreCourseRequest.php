<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreCourseRequest extends FormRequest
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
            '*.name' => 'required',
            '*.code'=> 'required',
            '*.description' => 'required',
            '*.type' => 'required',
            '*.trainingMode' => 'required',
            '*.mandatory' => 'required',
            '*.duration' => 'required|date_format:Y-m-d',
            '*.archived' => 'required',
            '*.systemAdminId' => 'required|integer',
            '*.assignedCourseAdminId' => 'required|integer',
        ];
    }

    public function prepareforValidation(){
        $data = [];
        foreach($this->toArray() as $obj){
            $obj['traning_mode'] = $obj['trainingMode'] ?? null;
            $obj['system_admin_id'] = $obj['systemAdminId'] ?? null;
            $obj['assigned_course_admin_id'] = $obj['assignedCourseAdminId'] ?? null;
            $data[] = $obj;
        }
        $this->merge($data);
    }
}
