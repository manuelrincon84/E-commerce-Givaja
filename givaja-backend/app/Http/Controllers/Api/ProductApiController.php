<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    // API: List products
    public function index(Request $request)
    {
        $search = $request->input('search');
        $productsQuery = Product::with('category');

        if ($search) {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%$search%")
                        ;
                    });
            });
        }

        $products = $productsQuery->paginate(15);
        return ProductResource::collection($products);
    }

    // API: Show product
    public function show(Product $product)
    {
        $product->load('category');
        return new ProductResource($product);
    }
}
