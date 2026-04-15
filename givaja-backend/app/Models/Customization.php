<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customization extends Model
{
    protected $fillable = [
        'product_id',
        'color',
        'engraving_text',
        'extra_material',
        'price',
    ];

    /**
     * Get product for this customization
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
