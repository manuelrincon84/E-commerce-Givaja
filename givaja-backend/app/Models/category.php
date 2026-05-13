<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Searchable;

class Category extends Model
{
    use Searchable;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Campos en los que se puede buscar
     */
    protected $searchable = [
        'name',
        'description',
    ];

    /**
     * Get products belonging to this category
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

