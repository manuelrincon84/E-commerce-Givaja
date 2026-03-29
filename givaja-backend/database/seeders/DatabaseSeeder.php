<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear categorías de prueba
        Category::create([
            'name' => 'Electrónica',
            'description' => 'Productos electrónicos en general'
        ]);

        Category::create([
            'name' => 'Ropa',
            'description' => 'Prendas de vestir'
        ]);

        Category::create([
            'name' => 'Libros',
            'description' => 'Libros y material de lectura'
        ]);

        Category::create([
            'name' => 'Hogar',
            'description' => 'Artículos para el hogar'
        ]);

        // Crear usuarios de prueba
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@givaja.com',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
