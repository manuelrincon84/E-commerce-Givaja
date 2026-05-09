<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of orders
     */
    public function index()
    {
        $orders = Order::with('user')->paginate(15);
        return Inertia::render('orders/Index', ['orders' => $orders]);
    }

    /**
     * Show the form for creating a new order
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render('orders/Create', ['users' => $users]);
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
        return Inertia::render('orders/Show', ['order' => $order->load('user', 'orderDetails.product')]);
    }

    /**
     * Show the form for editing the specified order
     */
    public function edit(Order $order)
    {
        $users = User::all();
        return Inertia::render('orders/Edit', ['order' => $order, 'users' => $users]);
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
