<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of products
     */
    public function index()
    {
        $products = Product::with('category', 'updatedByUser')->paginate(15);
        return view('products.index', compact('products'));
    }

    /**
     * Show the form for creating a new product
     */
    public function create()
    {
        $categories = Category::all();
        $users = User::all();
        return view('products.create', compact('categories', 'users'));
    }

    /**
     * Store a newly created product in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url',
            'updated_by' => 'required|exists:users,id',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Display the specified product
     */
    public function show(Product $product)
    {
        $product->load('category', 'updatedByUser');
        return view('products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified product
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $users = User::all();
        return view('products.edit', compact('product', 'categories', 'users'));
    }

    /**
     * Update the specified product in storage
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url',
            'updated_by' => 'required|exists:users,id',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified product from storage
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Producto eliminado exitosamente.');
    }
}
