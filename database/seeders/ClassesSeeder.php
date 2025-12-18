<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ClassesSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        // On récupère les IDs des niveaux pour lier les classes
        $licence = DB::table('niveaux')->where('name', 'Licence')->first();
        $master = DB::table('niveaux')->where('name', 'Master')->first();

        DB::table('classes')->insert([
            // Classes Licence
            ['name' => 'L1', 'niveau_id' => $licence->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'L2', 'niveau_id' => $licence->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'L3', 'niveau_id' => $licence->id, 'created_at' => $now, 'updated_at' => $now],
            // Si tu as L4, L5, etc., tu peux les ajouter

            // Classes Master
            ['name' => 'M1', 'niveau_id' => $master->id, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'M2', 'niveau_id' => $master->id, 'created_at' => $now, 'updated_at' => $now],
            // Si ton master a plus de niveaux (M3, etc.), ajoute-les ici
        ]);
    }
}
