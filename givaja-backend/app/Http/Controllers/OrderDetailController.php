<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of order details
     */
    public function index()
    {
        $orderDetails = OrderDetail::with('order', 'product')->paginate(15);
        return view('order-details.index', compact('orderDetails'));
    }

    /**
     * Show the form for creating a new order detail
     */
    public function create()
    {
        $orders = Order::all();
        $products = Product::all();
        return view('order-details.create', compact('orders', 'products'));
    }

    /**
     * Store a newly created order detail in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0.01',
        ]);

        OrderDetail::create($validated);

        return redirect()->route('order-details.index')->with('success', 'Detalle de orden creado exitosamente.');
    }

    /**
     * Display the specified order detail
     */
    public function show(OrderDetail $orderDetail)
    {
        return view('order-details.show', compact('orderDetail'));
    }

    /**
     * Show the form for editing the specified order detail
     */
    public function edit(OrderDetail $orderDetail)
    {
        $orders = Order::all();
        $products = Product::all();
        return view('order-details.edit', compact('orderDetail', 'orders', 'products'));
    }

    /**
     * Update the specified order detail in storage
     */
    public function update(Request $request, OrderDetail $orderDetail)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0.01',
        ]);

        $orderDetail->update($validated);

        return redirect()->route('order-details.index')->with('success', 'Detalle de orden actualizado exitosamente.');
    }

    /**
     * Remove the specified order detail from storage
     */
    public function destroy(OrderDetail $orderDetail)
    {
        $orderDetail->delete();
        return redirect()->route('order-details.index')->with('success', 'Detalle de orden eliminado exitosamente.');
    }
}
