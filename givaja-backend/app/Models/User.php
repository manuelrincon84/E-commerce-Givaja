<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\Searchable;
use App\Enums\UserRole;

#[Fillable(['first_name', 'last_name', 'email', 'password', 'role', 'avatar', 'phone', 'bio', 'address'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, Searchable;

    /**
     * Campos en los que se puede buscar
     */
    protected $searchable = [
        'first_name',
        'last_name',
        'email',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
{
    return [
        'role'              => UserRole::class,
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
    ];
}

    /**
     * Get orders belonging to this user
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get cart belonging to this user
     */
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    /**
     * Get products updated by this user
     */
    public function updatedProducts()
    {
        return $this->hasMany(Product::class, 'updated_by');
    }
}
