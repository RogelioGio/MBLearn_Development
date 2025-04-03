<?php

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
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SubgroupController;
use App\Http\Controllers\Api\TitleController;
use App\Http\Controllers\Api\Training_ModeController;
use App\Http\Controllers\Api\TypeController;

//New Login routing
Route::post('/login', [AuthController::class, 'login']);
//Protected Routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load(['userInfos.roles']);
    });
    //test purposes amd account implementation (postman testing)
    // Route::post('/add-test-user', [UserController::class, 'addTestUser']);
    // Route::get('/users', [UserController::class, 'index']);
    // Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
    // Route::get('/reset-users', [UserController::class, 'resetUsers']);


    //Userlist API for the frontend
    Route::post('/add-user', [userInfo_controller::class, 'addUser']);
    Route::post('/add-many-users', [userInfo_controller::class, 'bulkStoreUsers']);
    //Send the id for both the userinfos and roleid
    Route::post('/addRole/{userInfos}/{role}', [userInfo_controller::class, 'addRole']);
    Route::post('/removeRole/{userInfos}/{role}', [userInfo_controller::class, 'removeRole']);
    Route::post('/addPermission/{userInfos}/{permission}', [userInfo_controller::class, 'addPermission']);
    Route::post('removePermission/{userInfos}/{permission}', [userInfo_controller::class, 'removePermission']);

    //Userlist API for the frontend
    Route::get('/index-user',[userInfo_controller::class, 'indexUsers']);
    Route::get('/index-archived-users', [userInfo_controller::class, 'indexArchivedUsers']);
    Route::get('/index-course-admins', [userInfo_controller::class, 'indexNotLearnerUsers']);
    Route::get('/select-user/{userInfos}', [userInfo_controller::class, 'findUser']);
    Route::get('/select-employeeid/{employeeID}',[userInfo_controller::class, 'findUser_EmployeeID']);
    Route::put('/update-user-info/{userInfos}',[userInfo_controller::class, 'updateUser']);
    Route::delete('/delete-user/{userInfos}',[userInfo_controller::class, 'deleteUser']);
    Route::post('/add-users-department/{userInfos}/{department}', [userInfo_controller::class, 'addDepartment']);
    Route::post('/add-users-branch/{userInfos}/{branch}', [userInfo_controller::class, 'addBranch']);
    Route::post('/add-branch-city/{branch}/{city} ', [BranchController::class, 'addCity']);
    Route::get('/select-user-assigned-courses/{userInfos}', [userInfo_controller::class, 'getAssignedCourses']);

    Route::apiResource('/cities', CityController::class);
    Route::apiResource('/departments', DepartmentController::class);
    Route::apiResource('/branches', BranchController::class);
    Route::apiResource('/titles', TitleController::class);
    Route::apiResource('/subgroups', SubgroupController::class);
    Route::apiResource('/divisions', DivisionController::class);
    Route::apiResource('/sections', SectionController::class);
    Route::apiResource('/permissions', PermissionController::class);

    //User enrolled course list
    Route::get('/select-user-courses/{userInfos}', [userInfo_controller::class, 'getUserCourses']);


    Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table
    Route::get('get-profile-image',[userInfo_controller::class, 'getProfile']); //Get Profile Image for UserCredentials

    //UserCredential API (for logging in accounts)
    Route::post('/addusercredentials', [userCredentials_controller::class, 'addUserCredentials']);
    Route::put('/update-user-creds/{userCredentials}',[userCredentials_controller::class, 'updateUserCredentials']);
    Route::get('/index-user-creds',[userCredentials_controller::class, 'userCredentialsList']);
    Route::get('/index-user-creds/inactive',[userCredentials_controller::class, 'UnuserCredentialsList']);
    Route::get('/select-user-creds/{userCredentials}',[userCredentials_controller::class, 'findUser_EmployeeID']);
    Route::delete('/delete-user-creds/{userCredentials}',[userCredentials_controller::class, 'deleteUser']);
    Route::get('/reset-user-creds',[userCredentials_controller::class, 'resetUsers']); //reset user table

    Route::get('get-profile-image',[userInfo_controller::class, 'getProfile']); //Get Profile Image for UserCredentials

    //UserCredential API (for logging in accounts)
    Route::put('/update-user-creds/{userCredentials}',[userCredentials_controller::class, 'updateUserCredentials']);
    Route::get('/index-user-creds',[userCredentials_controller::class, 'userCredentialsList']);
    Route::get('/select-user-creds/{employeeID}',[userCredentials_controller::class, 'findUser_EmployeeID']);
    Route::delete('/delete-user-creds/{userCredentials}',[userCredentials_controller::class, 'deleteUser']);

    //Enrollment API
    Route::post('/enrollments/bulk', [EnrollmentController::class, 'bulkStore']);
    Route::apiResource('/enrollments', EnrollmentController::class);
    Route::get('/index-user/enrolees', [EnrollmentController:: class, 'enrolees']);
    // Route::get('/index-user/enrolees', [ControllersEnrollmentController::class, 'enrolees']);

    //Courses API
    Route::apiResource('/courses', CourseController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/modes', Training_ModeController::class);
    Route::apiResource('/types', TypeController::class);
    Route::apiResource('/subgroups', SubgroupController::class);

    //Assigning Course Admin to Course
    Route::post('/assign-course-admin/{course}', [CourseController::class, 'assignCourseAdmin']);
    Route::get('/assigned-course-admins/{course}', [CourseController::class, 'getAssignedCourseAdmin']);

    //Course enrolled users
    Route::get('/select-course-users/{course}', [CourseController::class, 'getCourseUsers']);
    Route::post('/addType/{course}/{type}', [CourseController::class, 'addType']);
    Route::post('/removeType/{course}/{type}', [CourseController::class, 'removeType']);
    Route::post('/addCategory/{course}/{category}', [CourseController::class, 'addCategory']);
    Route::post('/removeCategory/{course}/{category}', [CourseController::class, 'removeCategory']);
    Route::post('/addMode/{course}/{training_mode}', [CourseController::class, 'addTrainingMode']);
    Route::post('/removeMode/{course}/{training_mode}', [CourseController::class, 'removeTrainingMode']);
    Route::post('/courses/bulk', [CourseController::class, 'bulkStore']);
    // Route::get('/courses/{course}/users', [CourseController::class, 'showEnrolledUsers']);

    //Role API (get and post with /roles, get, put, and delete with /roles/{roleid} every api resource is same as this)
    Route::apiResource('/roles', RoleController::class);


    //Fetching All Option for dropdown
    Route::get('/options', [OptionController::class,'index']);
    //Fetching All nessesary call for courselist maintenance
    Route::get('/coursecontext',[CourseContextController::class,'index']);
    Route::get('/coursecontext/{id}',[CourseContextController::class,'getSelectedCourse']);


});

Route::post('/add-user', [userInfo_controller::class, 'addUser']);
Route::post('/addusercredentials', [userCredentials_controller::class, 'addUserCredentials']);
Route::get('/test', [userInfo_controller::class, 'test']);

//Category API
Route::get('category',[FilterCategoryController::class, 'index']);
Route::post('create-category',[FilterCategoryController::class, 'store']);

route::post('create-option', [FilterOptionController::class, 'store']);

// Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table
// Route::get('/reset-user-creds',[userCredentials_controller::class, 'resetUsers']); //reset user table





