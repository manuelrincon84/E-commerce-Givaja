<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of orders
     */
    public function index()
    {
        $orders = Order::with('user')->paginate(15);
        return view('orders.index', compact('orders'));
    }

    /**
     * Show the form for creating a new order
     */
    public function create()
    {
        $users = User::all();
        return view('orders.create', compact('users'));
    }

    /**
     * Store a newly created order in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_date' => 'required|date_format:Y-m-d H:i',
            'total' => 'required|numeric|min:0.01',
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
        ]);

        Order::create($validated);

        return redirect()->route('orders.index')->with('success', 'Orden creada exitosamente.');
    }

    /**
     * Display the specified order
     */
    public function show(Order $order)
    {
        return view('orders.show', compact('order'));
    }

    /**
     * Show the form for editing the specified order
     */
    public function edit(Order $order)
    {
        $users = User::all();
        return view('orders.edit', compact('order', 'users'));
    }

    /**
     * Update the specified order in storage
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_date' => 'required|date_format:Y-m-d H:i',
            'total' => 'required|numeric|min:0.01',
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
        ]);

        $order->update($validated);

        return redirect()->route('orders.index')->with('success', 'Orden actualizada exitosamente.');
    }

    /**
     * Remove the specified order from storage
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('orders.index')->with('success', 'Orden eliminada exitosamente.');
    }
}
