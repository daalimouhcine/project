<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * *we call all tables that we created in seeders
     *
     * @return void
     */
    public function run()
    {

        $this->call(BUSeeder::class);
        $this->call(RhSeeder::class);
        $this->call(EquipeSeeder::class);
        // $this->call(PlaceSeeder::class);
        $this->call(CollaborateurSeeder::class);
        $this->call(ManagerSeeder::class);
    }
}
