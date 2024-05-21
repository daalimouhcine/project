<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
// faker 
use Faker\Generator as Faker;


use App\Models\BU;

class BUSeeder extends Seeder
{
    /**
     * Here we decide how many fake data we want , (1) mean we want 1 row
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       BU::factory(1)->create();
    }
}
