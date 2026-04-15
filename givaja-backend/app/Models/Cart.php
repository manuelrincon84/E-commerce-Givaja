<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'user_id',
    ];

    /**
     * Get user owner of this cart
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get items in this cart
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
