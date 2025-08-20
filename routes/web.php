<?php

use App\Http\Controllers\Admin\UjianAdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => "auth", "prefix" => '/admin', 'as' => 'admin.'], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/ujian', UjianAdminController::class);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
