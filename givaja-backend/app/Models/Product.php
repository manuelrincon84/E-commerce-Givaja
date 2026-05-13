<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\User;
use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, Searchable;

    /**
     * Campos en los que se puede buscar
     */
    protected $searchable = [
        'name',
        'description',
        'unit_price',
    ];
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'unit_price',
        'stock',
        'image_url',
        'updated_by',
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

    // Relación: Product tiene muchos OrderDetail
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    // Relación: Product tiene muchos CartItem
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    // Relación: Product tiene muchas Customization
    public function customizations()
    {
        return $this->hasMany(Customization::class);
    }
}

