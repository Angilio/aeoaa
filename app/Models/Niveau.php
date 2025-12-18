<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    protected $fillable = [
        'name',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'niveau_id');
    }

    public function classes()
    {
        return $this->hasMany(Classe::class, 'niveau_id');
    }
}
