<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'etablissement_id',
        'niveau_id',
        'classe_id',
        'logement_id',
        'contact',
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function logement()
    {
        return $this->belongsTo(Logement::class);
    }

    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }

    public function evenements()
    {
        return $this->hasMany(Evenements::class);
    }

    public function attributions()
    {
        return $this->hasMany(Attribution::class);
    }

    public function entrees()
    {
        return $this->hasMany(Entree::class);
    }
}
