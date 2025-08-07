<?php


use App\Events\fAsRead;
use App\Events\NotificationsMarkedAsRead;
use App\Http\Controllers\Api\ActivityLogsController;
use App\Http\Controllers\Api\CarouselImageController;
use App\Http\Controllers\Api\CourseContextController;
use App\Http\Controllers\Api\FilterOptionController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OptionController;
use App\Models\UserCredentials;
use App\Notifications\TestNotification;
use App\Services\GmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CompECourseController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\DivisionController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\userInfo_controller;
use App\Http\Controllers\Api\userCredentials_controller;
use App\Http\Controllers\Api\FilterCategoryController;
use App\Http\Controllers\Api\LessonsController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SubgroupController;
use App\Http\Controllers\Api\TitleController;
use App\Http\Controllers\Api\TypeController;
use App\Models\UserInfos;

//New Login routing
Route::post('/verifyOtp', [AuthController::class, 'verifyOtp']);
Route::post('/reqOtp',[AuthController::class, 'requestOTP']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/reset-passowrd-request', [AuthController::class, 'reqResetPassword']);
//Protected Routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load(['userInfos', 'userInfos.city','userInfos.permissions','userInfos.roles','userInfos.department','userInfos.branch','userInfos.title','userInfos.division','userInfos.section']);
    });
    Route::get('/status/{userId}/{lessonId}', [LessonsController::class, 'updateLearnerProgress']);
    Route::get('/course-search', [CourseController::class, 'CourseSearch']);

    Route::get('/exists/{courseId}', [CourseController::class, 'checkIfExist']);

    //Relationships API
    Route::post('/addRole/{userInfos}/{role}', [userInfo_controller::class, 'addRole']);
    Route::post('/removeRole/{userInfos}/{role}', [userInfo_controller::class, 'removeRole']);
    Route::post('/addPermission/{userInfos}/{permission}', [userInfo_controller::class, 'addPermission']);
    Route::post('removePermission/{userInfos}/{permission}', [userInfo_controller::class, 'removePermission']);
    Route::post('/add-users-department/{userInfos}/{department}', [userInfo_controller::class, 'addDepartment']);
    Route::post('/add-users-branch/{userInfos}/{branch}', [userInfo_controller::class, 'addBranch']);
    Route::post('/add-branch-city', [BranchController::class, 'addCity']);
    Route::post('/addType/{course}/{type}', [CourseController::class, 'addType']);
    Route::post('/removeType/{course}/{type}', [CourseController::class, 'removeType']);
    Route::post('/addCategory/{course}/{category}', [CourseController::class, 'addCategory']);
    Route::post('/removeCategory/{course}/{category}', [CourseController::class, 'removeCategory']);
    Route::post('/addMode/{course}/{training_mode}', [CourseController::class, 'addTrainingMode']);
    Route::post('/removeMode/{course}/{training_mode}', [CourseController::class, 'removeTrainingMode']);

    //User API
    Route::post('/add-user', [userInfo_controller::class, 'addUser']);
    Route::post('/add-many-users', [userInfo_controller::class, 'bulkStoreUsers']);
    Route::get('/index-user',[userInfo_controller::class, 'indexUsers']);
    Route::get('/index-archived-users', [userInfo_controller::class, 'indexArchivedUsers']);
    Route::get('/index-course-admins', [userInfo_controller::class, 'indexNotLearnerUsers']);
    Route::get('/select-user/{userInfos}', [userInfo_controller::class, 'findUser']);
    Route::get('/select-employeeid/{employeeID}',[userInfo_controller::class, 'findUser_EmployeeID']);
    Route::put('/update-user-info/{userInfos}',[userInfo_controller::class, 'updateUser']);
    Route::delete('/delete-user/{userInfos}',[userInfo_controller::class, 'deleteUser']);
    Route::put('/restore-user/{userInfos}', [userInfo_controller::class, 'restoreUser']);
    Route::get('/user-search', [userInfo_controller::class, 'UserInfoSearch']);

    Route::post('/addusercredentials', [userCredentials_controller::class, 'addUserCredentials']);
    Route::put('/update-user-creds/{userCredentials}',[userCredentials_controller::class, 'updateUserCredentials']);
    Route::get('/index-user-creds',[userCredentials_controller::class, 'userCredentialsList']);
    Route::get('/index-user-creds/inactive',[userCredentials_controller::class, 'UnuserCredentialsList']);
    Route::get('/select-user-creds/{userCredentials}',[userCredentials_controller::class, 'findUser_Creds']);
    Route::delete('/delete-user-creds/{userCredentials}',[userCredentials_controller::class, 'deleteUser']);
    Route::get('/reset-user-creds',[userCredentials_controller::class, 'resetUsers']); //reset user table
    Route::get('get-profile-image',[userInfo_controller::class, 'getProfile']); //Get Profile Image for UserCredentials
    Route::get('/select-user-creds/{employeeID}',[userCredentials_controller::class, 'findUser_EmployeeID']);
    Route::put('/reset-password/{userCredentials}', [userCredentials_controller::class, 'resetUserPassword']);
    Route::put('/change-user-password/{userCredentials}', [userCredentials_controller::class, 'changePassword']);
    Route::put('/restore-user-creds/{userCredentials}', [userCredentials_controller::class, 'restoreUser']);
    Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table
    Route::get('/user-creds-search', [userCredentials_controller::class, 'UserCredsSearch']);

    //User with course API
    Route::get('/select-user-courses/{userInfos}', [userInfo_controller::class, 'getUserCourses']);
    Route::get('/select-course-users/{course}', [CourseController::class, 'getCourseUsers']);
    Route::get('/enrollment-status-count/{userInfos}', [CourseController::class, 'countCourseStatus']);
    Route::get('/select-user-assigned-courses/{userInfos}', [userInfo_controller::class, 'getAssignedCourses']);
    Route::get('/select-user-added-courses/{userInfos}', [userInfo_controller::class, 'getAddedCourses']);
    Route::post('/courses/bulk', [CourseController::class, 'bulkStore']);
    Route::get('/assigned-course-admins/{course}', [CourseController::class, 'getAssignedCourseAdmin']);
    Route::get('/select-user-enrollment-status/{userInfos}', [userInfo_controller::class, 'enrollmentStatusCount']);
    Route::delete('/delete-enrolled-user/{userInfos}/{course}', [CourseController::class, 'removeEnrolledUser']);
    Route::get('/publish-course/{course}', [CourseController::class, 'publishCourse']);


    //Enrollment API
    Route::post('/enrollments/bulk', [EnrollmentController::class, 'bulkStore']);
    Route::apiResource('/enrollments', EnrollmentController::class);
    Route::get('/index-user/enrolees', [EnrollmentController:: class, 'enrolees']);
    Route::get('/index-user-enrollments/{course}', [userInfo_controller::class, 'indexEnrollingUsers']);

    //Form Input API
    Route::apiResource('/courses', CourseController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::post('/categories/bulk', [CategoryController::class, 'bulkStore']);

    Route::apiResource('/types', TypeController::class);
    Route::post('types/bulk', [TypeController::class, 'bulkStore']);

    Route::apiResource('/cities', CityController::class);
    Route::post('/cities/bulk', [CityController::class, 'bulkStore']);
    Route::apiResource('/departments', DepartmentController::class);
    Route::post('/departments/bulk', [DepartmentController::class, 'bulkStore']);
    Route::apiResource('/branches', BranchController::class);
    Route::post('/branches/bulk', [BranchController::class, 'bulkStore']);
    Route::apiResource('/titles', TitleController::class);
    Route::post('/titles/bulk', [TitleController::class, 'bulkStore']);
    Route::apiResource('/subgroups', SubgroupController::class);
    Route::apiResource('/divisions', DivisionController::class);
    Route::post('/divisions/bulk', [DivisionController::class, 'bulkStore']);
    Route::apiResource('/sections', SectionController::class);
    Route::post('/sections/bulk', [SectionController::class, 'bulkStore']);
    Route::apiResource('/permissions', PermissionController::class);

    //Assigning Course Admin to Course
    Route::post('/assign-course-admin/{course}', [CourseController::class, 'assignCourseAdmin']);
    Route::get('/get-available-course-admins/{course}', [userInfo_controller::class, 'indexAvailableCourseAdmins']);


    //Role API (get and post with /roles, get, put, and delete with /roles/{roleid} every api resource is same as this)
    Route::apiResource('/roles', RoleController::class);
    Route::post('/roles/bulk', [RoleController::class, 'bulkStore']);
    Route::get('/rolepermissions/{role}', [RoleController::class, 'showRolePermissions']);

    //Fetching All Option for dropdown
    Route::get('/options', [OptionController::class,'index']);
    //Fetching All nessesary call for courselist maintenance
    Route::get('/coursecontext',[CourseContextController::class,'index']);
    Route::get('/coursecontext/{id}/{userInfos}',[CourseContextController::class,'getSelectedCourse']);
    Route::get('/courseprogress/{id}/{userInfos}', [CourseContextController::class, 'getProgress']);
    Route::get('/coursecontext/{id}',[CourseContextController::class,'adminGetSelectedCourse']);


    //extra (permission)
    Route::post('/updateRolePermission/{role}', [RoleController::class, 'updateRolePermissions']);
    Route::put('/updateUserPermission/{userCredentials}', [userCredentials_controller::class, 'changeUserPermissions']);
    Route::post('/setCoursePermission/{course}', [CourseController::class, 'setCoursePermissions']);
    Route::put('/updatetest/{userCredentialsId}',[userCredentials_controller::class, 'updateTest']);





    //CompE Routes
    Route::get('/compECourses', [CompECourseController::class, 'index']);
    Route::get('/compECourses/{course}', [CompECourseController::class, 'show']);


    //Notifcation API
    Route::get('/index-notifications', [NotificationController::class, 'index']);
    Route::get('/has-unread-notifications', [NotificationController::class, 'hasUnreadNotifications']);
    Route::post('/mark-as-read',[NotificationController::class, 'markAllAsRead']);
});
Route::get('/test-broadcast', function () {
    broadcast(new NotificationsMarkedAsRead(1));
    return 'done';
});

//PUSH NOTIFICATION
// Route::post('/send-reset-password-req', [PushNotificationController::class, 'sendResetPasswordReq']);
//Design View PUSH NOTIFICATION
// Route::get('/preview-reset-password-email', function () {
//     $data = [
//         'username' => 'Test User',
//         'imageUrl' => asset('storage/images/Panel-1.png'),
//         'message' => 'Click the link below to reset your password:',
//         'actionUrl' => 'https://example.com/reset-password?email=test@example.com',
//         'actionText' => 'Reset Password',
//     ];
//     return view('emails.reset_password_notification', $data);
// });

Route::post('/send-notfication', function (){
    $user = UserCredentials::find(1); // Replace with the actual user ID
    $user->notify(new TestNotification());

    if($user){
        $message = 'Notification sent successfully';
    } else {
        $message = 'Failed to send notification';
    }

    return response()->json(['message' => $message], 200);
});


Route::apiResource('/carousels', CarouselImageController::class);
Route::get('/test/{id}/{userInfos}', [CourseContextController::class, 'getProgress']);


//Category API
Route::get('category',[FilterCategoryController::class, 'index']);
Route::post('create-category',[FilterCategoryController::class, 'store']);

route::post('create-option', [FilterOptionController::class, 'store']);

route::get('/index-logs', [ActivityLogsController::class, 'index']);

Route::get('/aaaa', function(){
    $user = UserInfos::find(1);
    $user2 = UserInfos::find(50);
    return $user2->permissionsRole;

});
Route::get('/test-gmail-refresh', function () {
    try {
        $gmailService = new GmailService();
        return 'Gmail service initialized successfully.';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});


// Route::get('/auth/login', function () {
//     $query = http_build_query([
//         'client_id' => env('MS_GRAPH_CLIENT_ID'),
//         'response_type' => 'code',
//         'redirect_uri' => env('MS_GRAPH_REDIRECT_URI'),
//         'response_mode' => 'query',
//         'scope' => env('MS_GRAPH_SCOPE'),
//     ]);

//     return redirect("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?$query");
// });

// Route::get('/auth/callback', function (Request $request) {
//     $code = $request->get('code');

//     $response = Http::asForm()->post('https://login.microsoftonline.com/common/oauth2/v2.0/token', [
//         'client_id' => env('MS_GRAPH_CLIENT_ID'),
//         'client_secret' => env('MS_GRAPH_CLIENT_SECRET'),
//         'grant_type' => 'authorization_code',
//         'code' => $code,
//         'redirect_uri' => env('MS_GRAPH_REDIRECT_URI'),
//         'scope' => env('MS_GRAPH_SCOPE'),
//     ]);

//     if ($response->failed()) {
//         return response()->json([
//             'error' => 'Token exchange failed',
//             'details' => $response->json()
//         ]);
//     }

//     $tokenData = $response->json();

//     file_put_contents(
//         storage_path('app/msgraph/token.json'),
//         json_encode([
//             'access_token' => $tokenData['access_token'],
//             'refresh_token' => $tokenData['refresh_token'],
//             'expires_at' => now()->addSeconds($tokenData['expires_in'])->toDateTimeString(),
//         ], JSON_PRETTY_PRINT)
//     );

//     return '✅ Microsoft Graph token saved to storage/app/msgraph/token.json';
// });


// Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table
// Route::get('/reset-user-creds',[userCredentials_controller::class, 'resetUsers']); //reset user table





