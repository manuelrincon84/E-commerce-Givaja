<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of carts
     */
    public function index()
    {
        $carts = Cart::with('user')->paginate(15);
        return view('carts.index', compact('carts'));
    }

    /**
     * Show the form for creating a new cart
     */
    public function create()
    {
        $users = User::all();
        return view('carts.create', compact('users'));
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
        return view('carts.show', compact('cart'));
    }

    /**
     * Show the form for editing the specified cart
     */
    public function edit(Cart $cart)
    {
        $users = User::all();
        return view('carts.edit', compact('cart', 'users'));
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
