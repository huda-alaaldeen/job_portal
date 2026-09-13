<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/search-job-posts',[JobController::class,'searchJobPosts']);
Route::post('/create-job-post',[JobController::class,'createJobPost'])->middleware('auth:sanctum');
Route::put('/update-job-post/{id}',[JobController::class,'updateJobPost'])->middleware('auth:sanctum');
Route::delete('/delete-job-post/{id}',[JobController::class,'deleteJobPost'])->middleware('auth:sanctum');
Route::get('/job-posts/{id}',[JobController::class,'getJobPostById']);
Route::post('/create-job-post',[JobController::class,'createJobPost'])->middleware('auth:sanctum');
Route::get('/view-job-details/{id}',[JobController::class,'viewJobDetails']);
Route::get('/filter-jobs',[JobController::class,'filterJobs']);
Route::get('/show-profile',[ProfileController::class,'showProfile'])->middleware('auth:sanctum');
Route::get('/list-job-posts',[JobController::class,'listJobPosts']);
Route::post('/submit-application',[ApplicationController::class,'submitApplication'])->middleware('auth:sanctum');