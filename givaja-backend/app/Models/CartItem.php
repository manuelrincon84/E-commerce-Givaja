<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $table = 'cart_items';

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
    ];

    /**
     * Get cart this item belongs to
     */
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Get product for this item
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
