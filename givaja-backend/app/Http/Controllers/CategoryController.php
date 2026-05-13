<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $query = Category::query();

        if ($search) {
            $query->search($search);
        }

        $categories = $query->paginate(15);
        return Inertia::render('categories/Index', ['categories' => $categories, 'search' => $search]);
    }

    /**
     * Show the form for creating a new category
     */
    public function create()
    {
        return Inertia::render('categories/Create');
    }

    /**
     * Store a newly created category in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')->with('success', 'Categoría creada exitosamente.');
    }

    /**
     * Display the specified category
     */
    public function show(Category $category)
    {
        return Inertia::render('categories/Show', ['category' => $category]);
    }

    /**
     * Show the form for editing the specified category
     */
    public function edit(Category $category)
    {
        return Inertia::render('categories/Edit', ['category' => $category]);
    }

    /**
     * Update the specified category in storage
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')->with('success', 'Categoría actualizada exitosamente.');
    }

    /**
     * Remove the specified category from storage
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Categoría eliminada exitosamente.');
    }
}
