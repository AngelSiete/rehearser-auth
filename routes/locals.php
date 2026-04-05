<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\LocalController;

Route::resource('locals', LocalController::class);

Route::get('/local/{local}', [LocalController::class, 'show']);
Route::post('/locals', [LocalController::class, 'store'])->name('locals.store');
Route::put('/locals/{local}', [LocalController::class, 'update'])->name('locals.update');

/* PROTECTED ROUTES*/

Route::get('/locals/create', [LocalController::class, 'create'])->middleware(['auth', 'owner'])->name('locals.create');
Route::get('/locals/{local}/edit', [LocalController::class, 'edit'])
    ->middleware(['auth', 'can:update,local'])
    ->name('locals.edit');

Route::middleware('auth')->group(function () {
    Route::get('/locals/{local}/book', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/locals/{local}/book', [BookingController::class, 'store'])->name('booking.store');
});
//Route::post('/locals/{local}/bookings', [BookingController::class, 'store'])->middleware(['auth', 'user'])->name('bookings.store');
/* END PROTECTED ROUTES*/
