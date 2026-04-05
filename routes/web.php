<?php

use App\Http\Controllers\DashboardController;
use App\Models\Local;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\PropietarioController;
use App\Http\Controllers\BookingController;

Route::inertia('/', 'welcome', [
    'locals' => Local::latest()->take(6)->get(),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('user/dashboard', [DashboardController::class, 'userDashboard'])
        ->name('user.dashboard');

    Route::middleware('owner')->group(function () {
        Route::get('owner/dashboard', [PropietarioController::class, 'dashboard'])
            ->name('owner.dashboard');
    });
});

Route::inertia('faq', 'faq')->name('faq');
Route::inertia('somos', 'somos')->name('somos');

/*
Route::get('/{any}', function () {
    return Inertia::render('404');
})->where('any', '.*');*/

require __DIR__.'/locals.php';
require __DIR__.'/settings.php';
