<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\ProductApiController;

// Public API routes for categories
Route::prefix('v1')->group(function () {
	// Public API routes for categories
	Route::get('/categories', [CategoryApiController::class, 'index']);
	Route::get('/categories/{category}', [CategoryApiController::class, 'show']);
	Route::post('/categories', [CategoryApiController::class, 'store']);

	// Public API routes for products
	Route::get('/products', [ProductApiController::class, 'index']);
	Route::get('/products/{product}', [ProductApiController::class, 'show']);
});
