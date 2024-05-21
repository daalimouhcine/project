<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipe>
 */
class EquipeFactory extends Factory
{
    /**
     * Define the model's default state for each Equipe(team) with fake data.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return[
            'nb_places' => fake()->numberBetween(5,15),
        ];
    }
}
