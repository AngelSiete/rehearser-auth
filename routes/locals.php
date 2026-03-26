<?php
use App\Http\Controllers\LocalController;

Route::resource('locals', LocalController::class);

Route::get('/local/{local}', [LocalController::class, 'show']);
Route::post('/locals', [LocalController::class, 'store'])->name('locals.store');
Route::get('/locals/{local}/edit', [LocalController::class, 'edit'])->name('locals.edit');
Route::put('/locals/{local}', [LocalController::class, 'update'])->name('locals.update');

/* PROTECTED ROUTES*/

Route::get('/locals/create', [LocalController::class, 'create'])->middleware(['auth', 'owner'])->name('locals.create');

/* END PROTECTED ROUTES*/
