<?php

namespace App\Http\Requests;

use App\Models\UserInfos;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class BulkStoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        Gate::authorize('create', UserInfos::class);
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
            'data.*.employeeID' => 'required|string|max:11|unique:userInfo,employeeID',
            'data.*.first_name' => 'required|string|max:30',
            'data.*.last_name' => 'required|string|max:30',
            'data.*.middle_name' => 'nullable|string|max:30',
            'data.*.name_suffix' => 'nullable|string|max:10',
            'data.*.role' => 'required|string|exists:roles,role_name',
            'data.*.department' => 'required|string|exists:departments,department_name',
            'data.*.title' => 'required|string|exists:titles,title_name',
            'data.*.branch' => 'required|string|exists:branches,branch_name',
            'data.*.status' => 'nullable|in:Active, Inactive',
            'data.*.profile_image' => 'nullable|string|max:255',
            'data.*.MBemail' => 'required|email|unique:userCredentials,MBemail',
            'data.*.password' => 'required|string|min:8',
        ];
    }
}
