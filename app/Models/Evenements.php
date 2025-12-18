<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenements extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
