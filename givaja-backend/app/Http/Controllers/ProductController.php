<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products with optional search
     */
    public function index(Request $request, string $locale)
    {
        $search = $request->query('search', '');

        $query = Product::with('category', 'updatedByUser');

        // Aplicar búsqueda si existe
        if ($search) {
            $query->search($search, ['name', 'description']);

            // También buscar por categoría
            $query->orWhereHas('category', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        $products = $query->paginate(15);

        return Inertia::render('products/Index', [
            'products' => $products,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new product
     */
    public function create(string $locale)
    {
        return Inertia::render('products/Create', [
            'categories' => Category::all(['id', 'name']),
            'users' => User::all(['id', 'first_name', 'last_name']),
        ]);
    }

    /**
     * Store a newly created product in storage
     */
    public function store(Request $request, string $locale)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price'  => 'required|numeric|min:0.01',
            'stock'       => 'required|integer|min:0',
            'image_url'   => 'nullable|url',
            'updated_by'  => 'required|exists:users,id',
        ]);

        Product::create($validated);

        return redirect()->route('products.index', ['locale' => $locale])
            ->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Display the specified product
     */
    public function show(string $locale, Product $product)
    {
        return Inertia::render('products/Show', [
            'product' => $product->load('category', 'updatedByUser'),
        ]);
    }

    /**
     * Show the form for editing the specified product
     */
    public function edit(string $locale, Product $product)
    {
        return Inertia::render('products/Edit', [
            'product'    => $product,
            'categories' => Category::all(['id', 'name']),
            'users' => User::all(['id', 'first_name', 'last_name']),
        ]);
    }

    /**
     * Update the specified product in storage
     */
    public function update(Request $request, string $locale, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price'  => 'required|numeric|min:0.01',
            'stock'       => 'required|integer|min:0',
            'image_url'   => 'nullable|url',
            'updated_by'  => 'required|exists:users,id',
        ]);

        $product->update($validated);

        return redirect()->route('products.index', ['locale' => $locale])
            ->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified product from storage
     */
    public function destroy(string $locale, Product $product)
    {
        $product->delete();

        return redirect()->route('products.index', ['locale' => $locale])
            ->with('success', 'Producto eliminado exitosamente.');
    }
}
