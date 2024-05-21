<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Hash;

use App\Models\BU;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BU>
 */
class BUFactory extends Factory
{
    /**
     * creation the data for business-unit in array 
     *
     * @return array<mixed>
     */
    public function definition()
    {
        return [
            'nom' => 'Kalda',
            'prenom' => 'Naoual',
            'email' =>  'nkalda@buf.com',
            'password' => Hash::make('nkalda123'),
            'image' => 'default.png',
            'phone' => '0612345678',
            'adresse' => 'rabat',
        ];
       
    }
}