<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admins
        User::factory()->count(3)->create([
            'role' => 'Admin',
        ]);

        // Vendedores
        User::factory()->count(15)->create([
            'role' => 'Vendedor',
        ]);

        // Clientes
        User::factory()->count(50)->create([
            'role' => 'Cliente',
        ]);
    }
}
