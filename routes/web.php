<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    // Redirect authenticated users to RBAC dashboard
    if (auth()->check()) {
        return redirect()->route('rbac.dashboard');
    }
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // RBAC Management Routes
    Route::get('/rbac', [\App\Http\Controllers\RbacDashboardController::class, 'index'])->name('rbac.dashboard');
    
    // Users Management
    Route::resource('users', \App\Http\Controllers\UserController::class);
    
    // Roles Management
    Route::resource('roles', \App\Http\Controllers\RoleController::class);
    
    // Menus Management
    Route::resource('menus', \App\Http\Controllers\MenuController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
