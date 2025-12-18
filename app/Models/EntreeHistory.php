<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntreeHistory extends Model
{
    use HasFactory;

    /**
     * Nom de la table associée.
     */
    protected $table = 'entrees_history';

    /**
     * Les attributs assignables en masse.
     */
    protected $fillable = [
        'entree_id',
        'field_name',
        'old_value',
        'new_value',
        'action_type',
        'reason',
        'modified_by',
        'modified_at',
        'ip_address',
    ];

    /**
     * Indique que le modèle ne doit pas gérer created_at et updated_at.
     */
    public $timestamps = false;

    /**
     * Relation : une entrée historique appartient à une entrée.
     */
    public function entree()
    {
        return $this->belongsTo(Entree::class, 'entree_id');
    }

    /**
     * Relation : utilisateur qui a modifié l'entrée.
     */
    public function modifiedBy()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }
}

