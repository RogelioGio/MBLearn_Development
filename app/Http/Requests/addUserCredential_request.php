<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addUserCredential_request extends FormRequest
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
            'employeeID' => 'required|string|max:11',
            'name' => 'required|string|max:255',
            'MBemail' => 'required|email|unique:userCredentials,MBemail',
            'password' => 'required|string|min:8',
            'role' => 'required|in:System Admin, Course Admin, Learner|max:225',
        ];
    }
}
