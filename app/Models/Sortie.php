<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sortie extends Model
{
    protected $fillable = [
        'montant',
        'caisse_id',
    ];

    public function caisse()
    {
        return $this->belongsTo(Caisse::class);
    }
}
