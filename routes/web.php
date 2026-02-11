<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AttributionController;
use App\Http\Controllers\LogementController;
use App\Http\Controllers\MembreController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:Président'])->group(function () {
    Route::get('/membres', [MembreController::class, 'index'])->name('membres.index');
});



// Routes pour les logements (Commission de logement seulement)
Route::middleware(['auth', 'role:Commission de logement'])->group(function () {
    Route::resource('logements', LogementController::class);

    // Routes pour les attributions
    Route::get('attributions', [AttributionController::class, 'index'])->name('attributions.index');
    Route::get('attributions/create', [AttributionController::class, 'create'])->name('attributions.create');
    Route::post('attributions', [AttributionController::class, 'store'])->name('attributions.store');
    Route::get('attributions/{attribution}/edit', [AttributionController::class, 'edit'])->name('attributions.edit');
    Route::put('attributions/{attribution}', [AttributionController::class, 'update'])->name('attributions.update');
    Route::delete('attributions/{attribution}', [AttributionController::class, 'destroy'])->name('attributions.destroy');

    // Route pour exporter les attributions en PDF
    //Route::get('attributions-export/pdf', [AttributionController::class, 'exportPdf'])->name('attributions.export.pdf');
    Route::get('attributions/export-pdf', [AttributionController::class, 'exportPdf'])
     ->name('attributions.export.pdf');
});



require __DIR__.'/auth.php';
