<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of payments
     */
    public function index()
    {
        $payments = Payment::with('order')->paginate(15);
        return Inertia::render('payments/Index', ['payments' => $payments]);
    }

    /**
     * Show the form for creating a new payment
     */
    public function create()
    {
        $orders = Order::all();
        return Inertia::render('payments/Create', ['orders' => $orders]);
    }

    /**
     * Store a newly created payment in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_date' => 'required|date_format:Y-m-d H:i',
            'amount' => 'required|numeric|min:0.01',
            'payment_status' => 'required|in:pending,completed,failed,refunded',
        ]);

        Payment::create($validated);

        return redirect()->route('payments.index')->with('success', 'Pago creado exitosamente.');
    }

    /**
     * Display the specified payment
     */
    public function show(Payment $payment)
    {
        return Inertia::render('payments/Show', ['payment' => $payment->load('order')]);
    }

    /**
     * Show the form for editing the specified payment
     */
    public function edit(Payment $payment)
    {
        $orders = Order::all();
        return Inertia::render('payments/Edit', ['payment' => $payment, 'orders' => $orders]);
    }

    /**
     * Update the specified payment in storage
     */
    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_date' => 'required|date_format:Y-m-d H:i',
            'amount' => 'required|numeric|min:0.01',
            'payment_status' => 'required|in:pending,completed,failed,refunded',
        ]);

        $payment->update($validated);

        return redirect()->route('payments.index')->with('success', 'Pago actualizado exitosamente.');
    }

    /**
     * Remove the specified payment from storage
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index')->with('success', 'Pago eliminado exitosamente.');
    }
}
