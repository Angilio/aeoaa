<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entree extends Model
{
    protected $fillable = [
        'montant',
        'user_id',
        'ress_financiere_id', // il faut ajouter ce champ pour le mass assignable
    ];

    // Relation : une entrée appartient à une ressource financière
    public function ressource()
    {
        return $this->belongsTo(RessFinanciere::class, 'ress_financiere_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}
