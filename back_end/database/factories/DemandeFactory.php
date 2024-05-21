<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Demande>
 */
class DemandeFactory extends Factory
{
    /**
     * Define the model's default state for each demande with fake data.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // 'type' => fake()->randomElement(['Annuler', 'Reserver']),
            // 'message' => fake()->paragraph(),
            // 'collaborateur_id' => Collaborateur::all()->random()->id,
            // 'manager_id' => Manager::all()->random()->id,
            // 'place_id' => Place::all()->random()->id,
        ];
    }
}
