<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\Equipe;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manager>
 */
class ManagerFactory extends Factory
{
    /**
     * Define the model's default state for each Manager with fake data
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->Lastname();
        $prenom = fake()->Firstname();
        

        return [
            'nom' => $name,
            'prenom' => $prenom,
            'email' => $prenom.'.'.$name.'@manager.com',
            'password' => Hash::make('password'),
            'image' => 'default.png',
            'phone' => fake()->phoneNumber(),
            'adresse' => fake()->address(),
            // each manager have one unique equipe_id
            'equipe_id' => Equipe::all()->random()->id,


            
        ];
    }
}
