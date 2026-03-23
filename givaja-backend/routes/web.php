<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('inicio');
});

Route::resource('/products', ProductController::class);
