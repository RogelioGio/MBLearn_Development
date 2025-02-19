<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addUserInfo extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'name_suffix' => 'nullable|string|max:10',
            'department' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'status' => 'nullable|in:Active, Inactive',
            'profile_image' => 'nullable|string|max:255'
        ];
    }
        /**
         * Get custom validation error messages.
         *
         * @return array<string, string>
         */
        public function messages(): array
        {
            return [
                'role.in' => 'The selected role is invalid. Please choose from "System Admin", "Course Admin", or "Learner".',
                'MBemail.unique' => 'The working metrobank email address is already in use.',
                'employeeID.unique' => 'This employee ID is already registered.',
                'name.unique' => 'This name is already registered.',
            ];
        }

}
