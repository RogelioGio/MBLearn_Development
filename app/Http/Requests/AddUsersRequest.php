<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUsersRequest extends FormRequest
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
            'employeeID' => 'required|string|max:11|unique:userInfo,employeeID',
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'middle_name' => 'nullable|string|max:30',
            'name_suffix' => 'nullable|string|max:10',
            'role_id' => 'required|integer|exists:roles,id',
            'department_id' => 'required|integer|exists:departments,id',
            'title_id' => 'required|integer|exists:titles,id',
            'branch_id' => 'required|integer|exists:branches,id',
            'status' => 'nullable|in:Active, Inactive',
            'profile_image' => 'nullable|string|max:255',
            'MBemail' => 'required|email|unique:userCredentials,MBemail',
            'password' => 'required|string|min:8',
        ];
    }
}
