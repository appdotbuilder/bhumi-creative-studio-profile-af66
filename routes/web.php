<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with company profile
Route::get('/', [HomeController::class, 'index'])->name('welcome');

// Public pages and blog routes
Route::get('/pages/{slug}', function ($slug) {
    // This will be implemented later for public page viewing
    return redirect()->route('welcome');
})->name('pages.public');

Route::get('/blog/{slug}', function ($slug) {
    // This will be implemented later for public blog post viewing
    return redirect()->route('welcome');
})->name('blog.public');

// Protected CMS routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return inertia('dashboard');
    })->name('dashboard');

    // Page Management
    Route::resource('pages', PageController::class);
    
    // Blog Management
    Route::resource('blog-posts', BlogPostController::class);
    
    // Placeholder routes for menu and user management
    Route::get('menus', function () {
        return inertia('cms/menus/index');
    })->name('menus.index');
    
    Route::get('users', function () {
        return inertia('cms/users/index');
    })->name('users.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';