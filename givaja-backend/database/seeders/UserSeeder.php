<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\UserRole;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name'  => 'Test',
            'email'      => 'admin@test.com',
            'password'   => bcrypt('password'),
            'role'       => UserRole::Admin,
        ]);

        User::create([
            'first_name' => 'Seller',
            'last_name'  => 'Test',
            'email'      => 'seller@test.com',
            'password'   => bcrypt('password'),
            'role'       => UserRole::Seller,
        ]);

        User::create([
            'first_name' => 'Customer',
            'last_name'  => 'Test',
            'email'      => 'customer@test.com',
            'password'   => bcrypt('password'),
            'role'       => UserRole::Customer,
        ]);
        // Admins
        User::factory()->count(3)->create([
            'role' => UserRole::Admin,
        ]);

        // Vendedores
        User::factory()->count(15)->create([
            'role' => UserRole::Seller,
        ]);

        // Clientes
        User::factory()->count(50)->create([
            'role' => UserRole::Customer,
        ]);
    }
}
