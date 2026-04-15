<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_date',
        'total',
        'status',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    /**
     * Get user who owns this order
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get order details
     */
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    /**
     * Get payments for this order
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
