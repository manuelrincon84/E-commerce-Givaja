<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Cart;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    /**
     * Display a listing of cart items
     */
    public function index()
    {
        $cartItems = CartItem::with('cart', 'product')->paginate(15);
        return Inertia::render('cart-items/Index', ['cartItems' => $cartItems]);
    }

    /**
     * Show the form for creating a new cart item
     */
    public function create()
    {
        $carts = Cart::all();
        $products = Product::all();
        return Inertia::render('cart-items/Create', ['carts' => $carts, 'products' => $products]);
    }

    /**
     * Store a newly created cart item in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        CartItem::create($validated);

        return redirect()->route('cart-items.index')->with('success', 'Artículo del carrito creado exitosamente.');
    }

    /**
     * Display the specified cart item
     */
    public function show(CartItem $cartItem)
    {
        return Inertia::render('cart-items/Show', ['cartItem' => $cartItem]);
    }

    /**
     * Show the form for editing the specified cart item
     */
    public function edit(CartItem $cartItem)
    {
        $carts = Cart::all();
        $products = Product::all();
        return Inertia::render('cart-items/Edit', ['cartItem' => $cartItem, 'carts' => $carts, 'products' => $products]);
    }

    /**
     * Update the specified cart item in storage
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update($validated);

        return redirect()->route('cart-items.index')->with('success', 'Artículo del carrito actualizado exitosamente.');
    }

    /**
     * Remove the specified cart item from storage
     */
    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();
        return redirect()->route('cart-items.index')->with('success', 'Artículo del carrito eliminado exitosamente.');
    }
}
