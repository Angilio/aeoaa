<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SortieHistory extends Model
{
    use HasFactory;

    /**
     * Nom de la table associée.
     */
    protected $table = 'sorties_history';

    /**
     * Les attributs assignables en masse.
     */
    protected $fillable = [
        'sortie_id',
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
     * Indique que le modèle ne gère pas created_at et updated_at.
     */
    public $timestamps = false;

    /**
     * Relation : une sortie historique appartient à une sortie.
     */
    public function sortie()
    {
        return $this->belongsTo(Sortie::class, 'sortie_id');
    }

    /**
     * Relation : utilisateur qui a effectué la modification.
     */
    public function modifiedBy()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }
}
