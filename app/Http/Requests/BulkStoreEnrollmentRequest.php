<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreEnrollmentRequest extends FormRequest
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
        return [
            '*.userId'=> 'required|integer|exists:users,id',
            '*.courseId'=> 'required|integer|exists:courses,id',
            '*.enrollerId'=> 'required|integer|exists:users,id'
        ];
    }

    public function prepareforValidation(){
        $data = [];
        foreach($this->toArray() as $obj){
            $obj['user_id'] = $obj['userId'] ?? null;
            $obj['course_id'] = $obj['courseId'] ?? null;
            $obj['enroller_id'] = $obj['enrollerId'] ?? null;
            $data[] = $obj;
        }
        $this->merge($data);
    }
}
