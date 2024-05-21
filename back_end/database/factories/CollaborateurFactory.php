<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


use App\Models\Collaborateur;
use App\Models\Equipe;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collaborateur>
 */
class CollaborateurFactory extends Factory
{
    /**
     * Define the model's default state for each collaborateur with fake data.
     *
     * @return array<mixed>
     */
    public function definition()
    {   
        
        $name = fake()->Lastname();
        $prenom = fake()->Firstname();
        
        return [
            'nom' => $name,
            'prenom' => $prenom,
            'email' => $prenom.'.'.$name.'@collab.com',
            'password' => Hash::make('password'),
            'image' => 'default.png',
            'phone' => fake()->phoneNumber(),
            'adresse' => fake()->address(),
            'equipe_id' => Equipe::all()->random()->id,
     
        ];
    }
}
