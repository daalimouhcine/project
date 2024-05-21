<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\RH;

class RhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * *we have 1 Rh 
     *
     * @return void
     */
    public function run()
    {
        RH::factory(1)->create();
    }
}
