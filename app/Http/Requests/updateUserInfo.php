<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updateUserInfo extends FormRequest
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
            'department_id' => 'required|integer|exists:departments,id',
            'title_id' => 'required|integer|exists:titles,id',
            'branch_id' => 'required|integer|exists:branches,id',
            'status' => 'nullable|in:Active, Inactive',
        ];
    }
}
