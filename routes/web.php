<?php

use App\Models\Local;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'locals' => Local::latest()->take(5)->get(),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::inertia('faq', 'faq')->name('faq');
Route::inertia('somos', 'somos')->name('somos');

Route::get('/{any}', function () {
    return Inertia::render('404');
})->where('any', '.*');

require __DIR__.'/locals.php';
require __DIR__.'/settings.php';
