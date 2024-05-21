<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Equipe;

class EquipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * *in the first place we created 4 teams that we have here manually 
     * 
     *
     * @return void
     */
    public function run()
    {
      
        Equipe::create(['nb_places' => 15, 'name' => 'Les Sentinelles']);
        Equipe::create(['nb_places' => 12, 'name' => 'Les DevGeeks']);
        Equipe::create(['nb_places' => 13, 'name' => 'Les In The Loop']);
        Equipe::create(['nb_places' => 14, 'name' => 'Les All for One']);


        
    }
}
