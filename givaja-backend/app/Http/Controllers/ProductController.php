<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{

    public function index()
    {
        return Product::with('category', 'updatedByUser')->get();
    }


    // 💾 Guardar producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'nullable|string',
            'updated_by' => 'required|exists:users,id'
        ]);

        $product = Product::create($validated);

        return response()->json($product);
    }

    // 🔍 Mostrar un producto (usa Route Model Binding)
    public function show(Product $product)
    {
        return $product->load('category', 'updatedByUser');
    }

    // ✏️ Mostrar formulario edición (opcional)
    public function edit(Product $product)
    {
        return $product;
    }

    // 🔄 Actualizar producto
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'image_url' => 'nullable|string',
            'updated_by' => 'sometimes|exists:users,id'
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    // 🗑️ Eliminar producto
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente'
        ]);
    }
}
