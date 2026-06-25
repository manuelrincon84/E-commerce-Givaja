<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request, string $locale)
    {
        $search = $request->input('search', '');

        $query = Product::with('category')->latest();

        if ($search) {
            $query->search($search);
        }

        return Inertia::render('Home', [
            'products' => $query->paginate(15),
            'search' => $search,
        ]);
    }
}
