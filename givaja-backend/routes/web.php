<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'index']);

// Resource routes
Route::resource('users', \App\Http\Controllers\UserController::class);
Route::resource('categories', \App\Http\Controllers\CategoryController::class);
Route::resource('products', \App\Http\Controllers\ProductController::class);
Route::resource('orders', \App\Http\Controllers\OrderController::class);
Route::resource('order-details', \App\Http\Controllers\OrderDetailController::class);
Route::resource('carts', \App\Http\Controllers\CartController::class);
Route::resource('cart-items', \App\Http\Controllers\CartItemController::class);
Route::resource('customizations', \App\Http\Controllers\CustomizationController::class);
Route::resource('payments', \App\Http\Controllers\PaymentController::class);

