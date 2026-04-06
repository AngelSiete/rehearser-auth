<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PropietarioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('user/dashboard', [DashboardController::class, 'userDashboard'])
        ->name('user.dashboard');

    Route::middleware('owner')->group(function () {
        Route::get('owner/dashboard', [PropietarioController::class, 'dashboard'])
            ->name('owner.dashboard');
    });
});
