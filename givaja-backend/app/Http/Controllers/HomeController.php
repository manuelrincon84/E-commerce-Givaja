<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $query = Product::latest();

        if ($search) {
            $query->search($search);
        }

        return Inertia::render('Home', [
            'products' => $query->paginate(15),
            'search' => $search,
        ]);
    }
}
