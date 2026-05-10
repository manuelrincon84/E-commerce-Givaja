<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CustomizationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Aquí se registran las rutas web de la aplicación.
| Se utiliza Inertia.js para renderizar vistas React y Laravel
| como backend principal.
|
*/

Route::get('/', [HomeController::class, 'index']) ->name('home');
Route::get('/home', [HomeController::class, 'index']) ->name('home')
;

/*
|--------------------------------------------------------------------------
| Static Pages (Inertia)
|--------------------------------------------------------------------------
*/

Route::inertia('/dashboard', 'Dashboard')
    ->name('dashboard');

/*
|--------------------------------------------------------------------------
| Resource Routes
|--------------------------------------------------------------------------
|
| CRUD completos manejados mediante controllers.
| Los controllers retornan Inertia::render(...)
|
*/

Route::resource('products', ProductController::class);

Route::resource('categories', CategoryController::class);

Route::resource('users', UserController::class);

Route::resource('orders', OrderController::class);

Route::resource('order-details', OrderDetailController::class);

Route::resource('carts', CartController::class);

Route::resource('cart-items', CartItemController::class);

Route::resource('customizations', CustomizationController::class);

Route::resource('payments', PaymentController::class);

/*
|--------------------------------------------------------------------------
| Fallback Route
|--------------------------------------------------------------------------
|
| Redirige cualquier ruta inexistente al home.
|
*/

Route::fallback(function () {
    return redirect()->route('products.index');
});
