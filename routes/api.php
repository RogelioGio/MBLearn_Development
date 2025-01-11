<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;;
use App\Http\Controllers\Api\UserInfoController;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);


//test purposes amd account implementation (postman testing)
Route::post('/add-test-user', [UserController::class, 'addTestUser']);
Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::get('/reset-users', [UserController::class, 'resetUsers']);


//Userlist API for the frontend
Route::get('/userinfo', [UserInfoController::class, 'userinfo']);
Route::get('/selecteduser/{id}',[UserInfoController::class,'selecteduser']);
