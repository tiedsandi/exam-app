<?php

use App\Http\Controllers\Admin\AdminKelompokController;
use App\Http\Controllers\Admin\AdminPesertaController;
use App\Http\Controllers\Admin\AdminSesiController;
use App\Http\Controllers\Admin\AdminSoalController;
use App\Http\Controllers\Admin\UjianAdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => "auth", "prefix" => '/admin', 'as' => 'admin.'], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/ujian', UjianAdminController::class);
    Route::resource('/sesi', AdminSesiController::class);

    Route::get('/soal/import', [AdminSoalController::class, 'importForm'])
        ->name('soal.importform');
    Route::post('/soal/import', [AdminSoalController::class, 'import'])
        ->name('soal.import');
    Route::get('/soal/format', [AdminSoalController::class, 'downloadFormat'])
        ->name('soal.format');
    Route::resource('/soal', AdminSoalController::class);

    Route::get('/peserta/import', [AdminPesertaController::class, 'importForm'])->name('peserta.importform');
    Route::post('/peserta/import', [AdminPesertaController::class, 'import'])->name('peserta.import');
    Route::get('/peserta/export', [AdminPesertaController::class, 'export'])->name('peserta.export');
    Route::get('/peserta/format', [AdminPesertaController::class, 'downloadFormat'])->name('peserta.format');
    Route::get('/peserta/print', [AdminPesertaController::class, 'print'])->name('peserta.print');
    Route::get('/peserta/kartupdf', [AdminPesertaController::class, 'kartuPdf'])->name('peserta.kartupdf');
    Route::resource('/peserta', AdminPesertaController::class);

    Route::get('/kelompok/setujian/{id}', [AdminKelompokController::class, 'setUjian'])->name('kelompok.setujian');
    Route::resource('/kelompok', AdminKelompokController::class);
    Route::get('/kelompok/sesi/{id}', [AdminKelompokController::class, 'getSesi'])
        ->name('kelompok.getsesi');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
