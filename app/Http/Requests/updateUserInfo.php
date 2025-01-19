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
            'name' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'role' => 'required|in:System Admin,Course Admin,Learner',
            'status' => 'nullable|in:Active, Unactive',
        ];
    }
}
