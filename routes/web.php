<?php

use App\Http\Controllers\LocalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::resource('locals', LocalController::class);

Route::get('/local/{local}', [LocalController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

});

require __DIR__.'/settings.php';
