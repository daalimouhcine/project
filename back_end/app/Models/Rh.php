<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rh extends Model
{
    use HasFactory;

    protected $fillable =[
        'nom',
        'prenom',
        'email',
        'image',
        'phone',
        'adresse',

    ];


    protected $hidden =[
        'password',
    ];

}
