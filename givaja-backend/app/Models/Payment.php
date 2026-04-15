<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'payment_date',
        'amount',
        'payment_status',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
    ];

    /**
     * Get order this payment belongs to
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
