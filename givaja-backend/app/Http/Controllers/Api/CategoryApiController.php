<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request;

class CategoryApiController extends Controller
{
    // API: List categories
    public function index()
    {
        $categories = Category::withCount('products')->paginate(10);

        return CategoryResource::collection($categories);
    }

    // API: Show category
    public function show(Category $category)
    {
        $category->load('products');

        return new CategoryResource($category);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'minimum_quantity' => 'required|integer|min:0',
        ]);

        Category::create($validated);

        return response()->json(['message' => 'Category created successfully.'], 201);
    }
}
