<?php

use App\Http\Controllers\Api\FilterOptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\userInfo_controller;
use App\Http\Controllers\Api\userCredentials_controller;
use App\Http\Controllers\Api\FilterCategoryController;
use App\Http\Controllers\Api\Filters;
use App\Http\Controllers\EnrollmentController as ControllersEnrollmentController;

//New Login routing
Route::post('/login', [AuthController::class, 'login']);
//Protected Routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //test purposes amd account implementation (postman testing)
    // Route::post('/add-test-user', [UserController::class, 'addTestUser']);
    // Route::get('/users', [UserController::class, 'index']);
    // Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
    // Route::get('/reset-users', [UserController::class, 'resetUsers']);


    //Userlist API for the fronten
    Route::get('/index-user',[userInfo_controller::class, 'indexUsers']);
    Route::get('/select-user/{id}',[userInfo_controller::class, 'findUser']);
    Route::get('/select-employeeid/{employeeID}',[userInfo_controller::class, 'findUser_EmployeeID']);
    Route::put('/update-user-info/{employeeID}',[userInfo_controller::class, 'updateUser']);
    Route::delete('/delete-user/{employeeID}',[userInfo_controller::class, 'deleteUser']);

    Route::get('get-profile-image',[userInfo_controller::class, 'getProfile']); //Get Profile Image for UserCredentials

    //UserCredential API (for logging in accounts)
    Route::put('/update-user-creds/{employeeID}',[userCredentials_controller::class, 'updateUserCredentials']);
    Route::get('/index-user-creds',[userCredentials_controller::class, 'userCredentialsList']);
    Route::get('/select-user-creds/{employeeID}',[userCredentials_controller::class, 'findUser_EmployeeID']);
    Route::delete('/delete-user-creds/{employeeID}',[userCredentials_controller::class, 'deleteUser']);
    Route::get('/usercredentials/{userCredentials}/courses', [userCredentials_controller::class, 'showEnrolledCourses']);

    //Enrollment API
    Route::post('/enrollments/bulk', [EnrollmentController::class, 'bulkStore']);
    Route::apiResource('/enrollments', EnrollmentController::class);
    //Route::get('/index-user/enrolees', [EnrollmentController:: class, 'enrolees']);
    Route::get('/index-user/enrolees', [ControllersEnrollmentController::class, 'enrolees']);

    //Courses API
    Route::apiResource('/courses', CourseController::class);
    Route::post('/courses/bulk', [CourseController::class, 'bulkStore']);
    Route::get('/courses/{course}/users', [CourseController::class, 'showEnrolledUsers']);


});
Route::post('/add-user', [userInfo_controller::class, 'addUser']);
Route::post('/addusercredentials', [userCredentials_controller::class, 'addUserCredentials']);
Route::get('/test', [userInfo_controller::class, 'test']);

//Category API
Route::get('category',[FilterCategoryController::class, 'index']);
Route::post('create-category',[FilterCategoryController::class, 'store']);

route::post('create-option', [FilterOptionController::class, 'store']);

Route::get('/reset-user',[userInfo_controller::class, 'resetUser']); //reset user table
Route::get('/reset-user-creds',[userCredentials_controller::class, 'resetUsers']); //reset user table

