<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use App\Models\RH;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rh>
 */
class RhFactory extends Factory
{
    /**
     * Define the model's default state for Rh .
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nom' => 'Merrakchi',
            'prenom' => 'Loubna',
            'email' =>  'lmerrakchi@rh.com',
            'password' => Hash::make('lmerrakchi123'),
            'image' => 'default.png',
            'phone' => '0612345678',
            'adresse' => 'rabat',
        ];
    }
}
