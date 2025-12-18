<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RessFinanciere extends Model
{
    protected $fillable = [
        'ressource',
    ];

    // Relation : une ressource financière peut avoir plusieurs entrées
    public function entrees()
    {
        return $this->hasMany(Entree::class, 'ress_financiere_id');
    }
}
