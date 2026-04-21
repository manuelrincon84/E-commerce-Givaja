<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $categories;
        static $vendors;

        // Evita consultar la BD 1000 veces 🔥
        $categories ??= Category::pluck('id')->toArray();
        $vendors ??= User::where('role', 'Vendedor')->pluck('id')->toArray();
        return [
            'category_id' => !empty($categories)
                ? fake()->randomElement($categories)
                : Category::factory(),
            'name' => fake()->randomElement([
                'Pulsera artesanal',
                'Collar tejido',
                'Aretes en hilo',
                'Anillo hecho a mano',
                'Tobillera bohemia',
                'Set artesanal'
            ]) . ' ' . fake()->colorName(),

            'description' => fake()->sentence(10),

            'unit_price' => fake()->numberBetween(5000, 80000),

            'stock' => fake()->numberBetween(0, 50),

            'image_url' => fake()->imageUrl(400, 400, 'fashion'),

            'updated_by' => !empty($vendors)
                ? fake()->randomElement($vendors)
                : User::factory(),
        ];
    }
}
