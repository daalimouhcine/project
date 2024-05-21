<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Collaborateur;

class CollaborateurSeeder extends Seeder
{
    /**
     * *Here we decide how many fake data we want , (120) mean we want 120 row
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Collaborateur::factory(120)->create();
        
    }

   
}
