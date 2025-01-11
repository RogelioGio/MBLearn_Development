<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\UserInfos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class userInfo_controller extends Controller
{
    //Add user information function
    public function addUser(Request $request){

        $validatedData = $request->validate([
            'employeeID' => 'required|string|max:11',
            'name' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'role' => 'required|in:System Admin, Course Admin, Learner',
            'status' => 'required|in:Active, Unactive',
            'profile_image' => 'nullable|string|max:255'
        ]);

        $profile_image = $this -> generateProfileImageurl($validatedData['name']);

        $userInfo = UserInfos::create([
            'employeeID' => $validatedData['employeeID'],
            'name' => $validatedData['name'],
            'department' => $validatedData['department'],
            'title' => $validatedData['title'],
            'branch' => $validatedData['branch'],
            'city' => $validatedData['city'],
            'role' => $validatedData['role'],
            'status' =>$validatedData['status'],
            'profile_image' =>$profile_image
        ]);

        return response()->json(['message' => 'User Info Added Successfully', 'data' => $userInfo],201);



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
    public function indexUsers(){
        $users = UserInfos::all();
        return response()->json(['data' => $users],200);
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

    //Truncate
    public function resetUser()
    {
        // Truncate the users table
        DB::table('userInfo')->truncate();
        return response()->json(['message' => 'User Info table reset successfully!'], 200);
    }

}
