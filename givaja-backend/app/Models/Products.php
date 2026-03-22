<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'unit_price',
        'stock',
        'image_url',
        'updated_at',
        'updated_by'
    ];

    // Relación: Product pertenece a Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relación: Product fue actualizado por un User
    public function updatedByUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
