<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            'Président',
            'Ancien président',
            'Commissaire au compte',
            'Trésorier(ère)',
            'Secrétaire',
            'Commission de logement',
            'Commission d\'étude',
            'Commission culturelle',
            'Commission sociale',
            'Commission de fête',
            'Président promotion',
            'Membres',
            'Novices',
        ];

        foreach ($roles as $role) {
            DB::table('roles')->insert([
                'name' => $role,
                'guard_name' => 'web',   // 🔥 Obligatoire avec Spatie
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
