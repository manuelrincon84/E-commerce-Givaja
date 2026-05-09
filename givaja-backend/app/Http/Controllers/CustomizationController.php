<?php

namespace App\Http\Controllers;

use App\Models\Customization;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CustomizationController extends Controller
{
    /**
     * Display a listing of customizations
     */
    public function index()
    {
        $customizations = Customization::with('product')->paginate(15);
        return Inertia::render('customizations/Index', ['customizations' => $customizations]);
    }

    /**
     * Show the form for creating a new customization
     */
    public function create()
    {
        $products = Product::all();
        return Inertia::render('customizations/Create', ['products' => $products]);
    }

    /**
     * Store a newly created customization in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'color' => 'nullable|string|max:255',
            'engraving_text' => 'nullable|string',
            'extra_material' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0.01',
        ]);

        Customization::create($validated);

        return redirect()->route('customizations.index')->with('success', 'Personalización creada exitosamente.');
    }

    /**
     * Display the specified customization
     */
    public function show(Customization $customization)
    {
        return Inertia::render('customizations/Show', ['customization' => $customization]);
    }

    /**
     * Show the form for editing the specified customization
     */
    public function edit(Customization $customization)
    {
        $products = Product::all();
        return Inertia::render('customizations/Edit', ['customization' => $customization, 'products' => $products]);
    }

    /**
     * Update the specified customization in storage
     */
    public function update(Request $request, Customization $customization)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'color' => 'nullable|string|max:255',
            'engraving_text' => 'nullable|string',
            'extra_material' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0.01',
        ]);

        $customization->update($validated);

        return redirect()->route('customizations.index')->with('success', 'Personalización actualizada exitosamente.');
    }

    /**
     * Remove the specified customization from storage
     */
    public function destroy(Customization $customization)
    {
        $customization->delete();
        return redirect()->route('customizations.index')->with('success', 'Personalización eliminada exitosamente.');
    }
}
