<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\Auth\ForgotPasswordController;
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

// Ruta raíz que redirige al idioma por defecto
Route::get('/', function () {
    $locale = session('locale') ?? app()->getLocale();
    return redirect("/{$locale}");
})->name('root');

/*
|--------------------------------------------------------------------------
| Locale Routes
|--------------------------------------------------------------------------
|
| Cambio de idioma de la aplicación
|
*/

Route::post('/locale/{locale}', [LocaleController::class, 'change'])->name('locale.change');
Route::get('/api/locales', [LocaleController::class, 'supported'])->name('locale.supported');

/*
|--------------------------------------------------------------------------
| Localized Routes
|--------------------------------------------------------------------------
|
| Todas las rutas agrupadas bajo prefijo de idioma {locale}
|
*/

Route::where(['locale' => 'en|es'])
    ->prefix('{locale}')
    ->middleware(['set.locale'])
    ->group(function () {

        // Home page
        Route::get('/', [HomeController::class, 'index'])->name('home');
       // Route::get('/home', [HomeController::class, 'index'])->name('home.alt');

        /*
        |--------------------------------------------------------------------------
        | Static Pages (Inertia)
        |--------------------------------------------------------------------------
        */

        Route::get('/api-products', function () {
        return Inertia::render('products/ApiProductsTest');

    });

        /*
        |--------------------------------------------------------------------------
        | RUTAS DE AUTENTICACIÓN - Guest only
        |--------------------------------------------------------------------------
        */
        Route::middleware('guest')->group(function () {
            Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
            Route::post('/login', [AuthController::class, 'login'])->name('login.post');
            Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
            Route::post('/register', [AuthController::class, 'register'])->name('register.post');

            // Forgot Password
            Route::get('/forgot-password', [ForgotPasswordController::class, 'show'])->name('password.request');
            Route::post('/forgot-password', [ForgotPasswordController::class, 'send'])->name('password.email');
            Route::get('/reset-password', [ForgotPasswordController::class, 'showReset'])->name('password.reset');
            Route::post('/reset-password', [ForgotPasswordController::class, 'reset'])->name('password.update');
        });

        // Logout (auth only)
        Route::post('/logout', [AuthController::class, 'logout'])
            ->middleware('auth')
            ->name('logout');

        /*
        |--------------------------------------------------------------------------
        | RUTAS DE PERFIL - Auth only
        |--------------------------------------------------------------------------
        */
        Route::middleware('auth')->group(function () {
            Route::get('/profile', [UserProfileController::class, 'edit'])->name('profile.edit');
            Route::post('/profile', [UserProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile/avatar', [UserProfileController::class, 'deleteAvatar'])->name('profile.avatar.delete');
        });

        /*
        |--------------------------------------------------------------------------
        | RESOURCE ROUTES - CRUD completos
        |--------------------------------------------------------------------------
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

    });


/*
|--------------------------------------------------------------------------
| Fallback Route
|--------------------------------------------------------------------------
|
| Redirige cualquier ruta inexistente al home.
|
*/

Route::fallback(function () {
    $locale = app()->getLocale();
    return redirect("/{$locale}/products");
});

