<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Caisse extends Model
{
    protected $fillable = [
        'montant',
    ];

    public function entrees()
    {
        return $this->hasMany(Entree::class, 'caisse_id');
    }

    public function sorties()
    {
        return $this->hasMany(Sortie::class, 'caisse_id');
    }
}
