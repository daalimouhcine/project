<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\equipe;
use Laravel\Sanctum\HasApiTokens;

class Collaborateur extends Model
{

    use HasFactory, HasApiTokens;


    use HasFactory;
protected $table = "collaborateurs";

    protected $fillable =[
        'nom',
        'prenom',
        'email',
        'image',
        'phone',
        'adresse',
        'equipe_id',

    ];

    protected $hidden =[
        'password',
    ];

    public function equipe(){
        return $this->belongsTo(Equipe::class);
    }

    public function demande(){
        return $this->hasMany(Demande::class);
    }

    public function reservation(){
        return $this->hasOne(Collaborateur::class);
    }






}
