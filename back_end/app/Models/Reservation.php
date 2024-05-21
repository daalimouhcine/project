<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable =[
        'date',
        'num_place',
        'collaborateur_id',
        'equipe_id',
    ];

    public function equipe(){
        return $this->belongsTo(Equipe::class);
    }

    public function collaborateur(){
        return $this->belongsTo(Collaborateur::class);
    }
}
