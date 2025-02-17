<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\addUserCredential_request;
use App\Http\Requests\addUserInfo;
use App\Http\Requests\updateUserInfo;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use App\Models\UserCredentials;
class userInfo_controller extends Controller
{

    //Add user information function
    public function addUser(addUserInfo $userRequest , addUserCredential_request $userCredentialRequest){

    $validatedData = $userRequest->validated();
    $validatedData2 = $userCredentialRequest->validated();

    $existingUser = UserInfos::where('employeeID', $validatedData['employeeID'])->first();

    if ($existingUser) {
        return response()->json([
            'message' => 'User already exists',
            'user' => $existingUser
        ], 409); // Use 409 Conflict instead of 200
    }

    // Combine first name, middle initial, last name, and suffix into a full name
    $fullName = trim("{$validatedData['first_name']} " .
                        ($validatedData['middle_initial'] ? "{$validatedData['middle_initial']}. " : "") .
                        "{$validatedData['last_name']} " .
                        ($validatedData['name_suffix'] ? $validatedData['name_suffix'] : ""));

    // Generate profile image URL (pass the correct name variable)
    $profile_image = $this->generateProfileImageUrl($fullName);

    // Default status to 'Active' if not provided
    $status = $validatedData['status'] ?? 'Active';

    $userCredentials = UserCredentials::create([
        'employeeID' => $validatedData2['employeeID'],
        'name' => $fullName ?? "Gio",  // Use the correctly formatted full name
        'role' => $validatedData['role'],
        'MBemail' => $validatedData2['MBemail'],
        'password' => $validatedData2['password'],
    ]);

    $userInfo = UserInfos::create([
        'employeeID' => $validatedData['employeeID'],
        'name' => $fullName ?? "Gio",  // Use the correctly formatted full name
        'department' => $validatedData['department'] ?? null,
        'title' => $validatedData['title'] ?? null,
        'branch' => $validatedData['branch'] ?? null,
        'city' => $validatedData['city'],
        'role' => $validatedData['role'],
        'status' => $status,
        'profile_image' => $profile_image,
        'user_credentials_id' => $userCredentials->id
    ]);


    $userInfo->update(['user_credentials_id' => $userCredentials->id]);

    // Return a success response
    return response()->json([
        'message' => 'User registered successfully',
        'user_info' => $userInfo,
        'user_credentials' => $userCredentials
    ], 201);

    }
    /**
    * Generate a default profile image URL based on the user's name
    */
    private function generateProfileImageurl($name){
        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=ffffff&background=03045e&bold=true&size=400';
    }

    /**
     * Fetch all user entries from the UserInfo table.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexUsers(Request $request){

        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $users =  UserInfos::paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'lastPage' => $users->lastPage(),
            'currentPage' => $users->currentPage()
        ],200);
    }

    /**
     * Display the specified user info.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function findUser($id)
    {
        // Find the user info by ID
        $user = UserInfos::find($id);

        if($user){
            return response() -> json(['data' => $user], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);  // Return error if not found
        }
    }

    //Find User using employeeID
    public function findUser_EmployeeID($employeeID)
    {
        // Find the user info by Employee ID
        $user = UserInfos::where('employeeID', $employeeID)->first();

        if($user){
            return response() -> json(['data' => $user], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);  // Return error if not found
        }
    }

    /**
     * Update the specified user info.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateUser($employeeID, updateUserInfo $request){

        //Input Validation
        $validatedData = $request->validated();

        //Find User by Employee ID
        $employee = UserInfos::where('employeeID', $employeeID)->first();
        //User Checker
        if(!$employee){
            return response()->json(['message' => 'User not found'], 404);
        }

        //Update UserInfo
        return DB::transaction(function () use ($employee, $validatedData){
            $employee->update($validatedData);

            return response() -> json(['message' => 'User Info Updated Successfully', 'data' => $employee], 200);
        });
    }

    //Delete User
    public function deleteUser($employeeID)
    {
        $user = UserInfos::where('employeeID', $employeeID)->first();

        if($user){
            $user->delete();
            return response()->json(['message' => 'User deleted successfully!'], 200);
        }else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    //Truncate
    public function resetUser()
    {
        // Truncate the users table
        DB::table('userInfo')->truncate();
        return response()->json(['message' => 'User Info table reset successfully!'], 200);
    }

    //Fetch UserProfilePhoto for the UserCredentials
    public function getProfile(Request $request)
    {
        $page = $request->input('page', 1);//Default page
        $perPage = $request->input('perPage',5); //Number of entry per page

        $profile_image = UserInfos::select('profile_image','employeeID')->paginate($perPage);
        return response()->json([
            'data' => $profile_image->items(),
            'total' => $profile_image->total(),
            'lastPage' => $profile_image->lastPage(),
            'currentPage' => $profile_image->currentPage()
        ],200);
    }

    public function test(){
        return response()->json(['message' => 'Test'], 200);
    }

}
