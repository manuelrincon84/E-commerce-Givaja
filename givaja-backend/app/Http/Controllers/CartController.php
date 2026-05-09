<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of carts
     */
    public function index()
    {
        $carts = Cart::with('user')->paginate(15);
        return Inertia::render('carts/Index', [
            'carts' => $carts,
        ]);

    }

    /**
     * Show the form for creating a new cart
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render('carts/Create', ['users' => $users]);
    }

    /**
     * Store a newly created cart in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|unique:carts|exists:users,id',
        ]);

        Cart::create($validated);

        return redirect()->route('carts.index')->with('success', 'Carrito creado exitosamente.');
    }

    /**
     * Display the specified cart
     */
    public function show(Cart $cart)
    {
        return Inertia::render('carts/Show', ['cart' => $cart]);
    }

    /**
     * Show the form for editing the specified cart
     */
    public function edit(Cart $cart)
    {
        $users = User::all();
        return Inertia::render('carts/Edit', ['cart' => $cart, 'users' => $users]);
    }

    /**
     * Update the specified cart in storage
     */
    public function update(Request $request, Cart $cart)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:carts,user_id,' . $cart->id,
        ]);

        $cart->update($validated);

        return redirect()->route('carts.index')->with('success', 'Carrito actualizado exitosamente.');
    }

    /**
     * Remove the specified cart from storage
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();
        return redirect()->route('carts.index')->with('success', 'Carrito eliminado exitosamente.');
    }
}
