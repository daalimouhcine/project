<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Manager;

class ManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * *we run 4 managers because we have just 4 teams but can added more in the back-office 
     *
     * @return void
     */
    public function run()
    {
        Manager::factory(4)->create();
    }
}
