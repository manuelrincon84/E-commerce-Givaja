<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $categories = [
            ['name' => 'Pulseras', 'description' => 'Pulseras artesanales hechas a mano'],
            ['name' => 'Collares', 'description' => 'Collares únicos con diseños artesanales'],
            ['name' => 'Aretes', 'description' => 'Aretes elegantes y modernos'],
            ['name' => 'Anillos', 'description' => 'Anillos artesanales personalizados'],
            ['name' => 'Tobilleras', 'description' => 'Accesorios para tobillo hechos a mano'],
            ['name' => 'Sets', 'description' => 'Conjuntos de bisutería artesanal'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
