<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::with('category', 'updatedByUser')->paginate(10);
        return view('products.index', compact('products'));
    }


    //  Guardar producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'nullable|string'
        ]);

        $validated['updated_by'] = auth()->id();

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Producto creado correctamente.');
    }

    // Mostrar un producto (usa Route Model Binding)
    public function show(Product $product)
    {
        $product->load('category', 'updatedByUser');
        return view('products.show', compact('product'));
    }

    // Crear producto - Mostrar formulario
    public function create()
    {
        $categories = Category::all();
        $users = User::all();
        return view('products.create', compact('categories', 'users'));
    }

    // Mostrar formulario edición
    public function edit(Product $product)
    {
        $categories = Category::all();
        $users = User::all();
        return view('products.edit', compact('product', 'categories', 'users'));
    }

    //  Actualizar producto
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'image_url' => 'nullable|string'
        ]);

        $validated['updated_by'] = auth()->id();

        $product->update($validated);

        return redirect()->route('products.show', $product)->with('success', 'Producto actualizado correctamente.');
    }

    // Eliminar producto
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Producto eliminado correctamente.');
    }
}
