<?php


use App\Http\Controllers\Api\ActivityLogsController;
use App\Http\Controllers\Api\CarouselImageController;
use App\Http\Controllers\Api\CourseContextController;
use App\Http\Controllers\Api\FilterOptionController;
use App\Http\Controllers\Api\OptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CityController;
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
use App\Models\Lesson;
use App\Models\UserInfos;

//New Login routing
Route::post('/login', [AuthController::class, 'login']);
//Protected Routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load(['userInfos', 'userInfos.permissions','userInfos.roles',]);
    });
    Route::get('/status/{userId}/{lessonId}', [LessonsController::class, 'updateLearnerProgress']);
    
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
    Route::put('/restore-user-creds/{userCredentials}', [userCredentials_controller::class, 'restoreUser']);
    Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table

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


    //Enrollment API
    Route::post('/enrollments/bulk', [EnrollmentController::class, 'bulkStore']);
    Route::apiResource('/enrollments', EnrollmentController::class);
    Route::get('/index-user/enrolees', [EnrollmentController:: class, 'enrolees']);
    Route::get('/index-user-enrollments/{course}', [userInfo_controller::class, 'indexEnrollingUsers']);

    //Form Input API
    Route::apiResource('/courses', CourseController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::post('/categories/bulk', [CategoryController::class, 'bulkStore']);
    Route::apiResource('/carousels', CarouselImageController::class);

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
    Route::get('/coursecontext/{id}',[CourseContextController::class,'adminGetSelectedCourse']);


    //extra (permission)
    Route::post('/updateRolePermission/{role}', [RoleController::class, 'updateRolePermissions']);
    Route::put('/updateUserPermission/{userCredentials}', [userCredentials_controller::class, 'changeUserPermissions']);
    Route::post('/setCoursePermission/{course}', [CourseController::class, 'setCoursePermissions']);

    Route::get('/test', [userInfo_controller::class, 'test']);

});



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
// Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table
// Route::get('/reset-user-creds',[userCredentials_controller::class, 'resetUsers']); //reset user table





