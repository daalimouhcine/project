<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manager extends Model
{
    use HasFactory;
protected $table = "managers";
    protected $fillable =[
        'nom',
        'prenom',
        'email',
        'image',
        'phone',
        'adresse',
        'equipe_id',
        'password'


    ];


    // protected $hidden =[
    //     'password',
    // ];

    public function equipe(){
        return $this->belongsTo(Equipe::class);
    }

    public function demande(){
        return $this->hasMany(Demande::class);
    }

}
