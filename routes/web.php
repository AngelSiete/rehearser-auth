<?php

use App\Models\Local;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'locals' => Local::latest()->take(6)->get(),
])->name('home');

/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();

        return match ($user->userType) {
            'owner' => redirect()->route('owner.dashboard'),
            'user' => redirect()->route('user.dashboard'),
            default => inertia('Dashboard/User'),
        };
    })->name('dashboard');
});
Route::middleware(['auth', 'verified', 'owner'])->group(function () {
    Route::inertia('owner/dashboard', 'dashboardsByUsers/Owner')->name('owner.dashboard');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('user/dashboard', 'dashboardsByUsers/User')->name('user.dashboard');
});

Route::inertia('faq', 'faq')->name('faq');
Route::inertia('somos', 'somos')->name('somos');

/*
Route::get('/{any}', function () {
    return Inertia::render('404');
})->where('any', '.*');*/

require __DIR__.'/locals.php';
require __DIR__.'/settings.php';
