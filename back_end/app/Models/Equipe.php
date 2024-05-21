<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    use HasFactory;
protected $table ="equipes";
    protected $fillable =[
        'name',
        'nb_places',

    ];

    public function collaborateurs(){
        return $this->hasMany(Collaborateur::class);
    }

    public function manager(){
        return $this->hasOne(Manager::class);
    }

    public function reservations(){
        return $this->hasMany(Reservation::class);
    }
}
