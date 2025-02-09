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
            'data.*.userId'=> 'required|integer|exists:userCredentials,id',
            'data.*.courseId'=> 'required|integer',
            'data.*.enrollerId'=> 'required|integer|exists:userCredentials,id'
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
