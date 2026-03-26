<?php

use App\Http\Controllers\LocalController;
use App\Models\Local;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'locals' => Local::latest()->take(5)->get(),
])->name('home');

Route::resource('locals', LocalController::class);

Route::get('/local/{local}', [LocalController::class, 'show']);
Route::post('/locals', [LocalController::class, 'store'])->name('locals.store');
Route::get('/locals/{local}/edit', [LocalController::class, 'edit'])->name('locals.edit');
Route::put('/locals/{local}', [LocalController::class, 'update'])->name('locals.update');

/* PROTECTED ROUTES*/
Route::get('/locals/create', [LocalController::class, 'create'])
    ->middleware(['auth', 'owner'])
    ->name('locals.create');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
/* END PROTECTED ROUTES*/

Route::inertia('faq', 'faq')->name('faq');
Route::inertia('somos', 'somos')->name('somos');

require __DIR__.'/settings.php';
