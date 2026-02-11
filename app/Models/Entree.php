<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entree extends Model
{
    protected $fillable = [
        'montant',
        'caisse_id',
        'ress_financiere_id', // il faut ajouter ce champ pour le mass assignable
    ];

    // Relation : une entrée appartient à une ressource financière
    public function ressource()
    {
        return $this->belongsTo(RessFinanciere::class, 'ress_financiere_id');
    }

    // Relation : si tu veux récupérer la caisse (optionnel)
    public function caisse()
    {
        return $this->belongsTo(Caisse::class);
    }
}
