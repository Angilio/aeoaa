<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logement extends Model
{
    protected $fillable = [
        'name',
        'nbrPlace',
        'type_logement_id',
    ];

    public function typeLogement()
    {
        return $this->belongsTo(TypeLogement::class, 'type_logement_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'logement_id');
    }
}
