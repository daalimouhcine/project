<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;

    protected $fillable =[
        'type',
        'message',
        'date',
        'collaborateur_id',
        'manager_id',
        'num_place'
    ];

    public function collaborateur(){
        return $this->belongsTo(Collaborateur::class);
    }

    public function manager(){
        return $this->belongsTo(Manager::class);
    }

   


}
