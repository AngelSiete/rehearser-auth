<?php

use App\Models\Local;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome', [
    'locals' => Local::latest()->take(6)->get(),
])->name('home');

require __DIR__.'/auth-users.php';
require __DIR__.'/locals.php';
require __DIR__.'/others.php';
require __DIR__.'/settings.php';

// para todas las rutas que den un 404
Route::get('/{any}', function () {
    return Inertia::render('404');
})->where('any', '.*');
