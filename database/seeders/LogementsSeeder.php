<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class LogementsSeeder extends Seeder
{
    public function run()
    {
        // On peut vider la table logements pour éviter les doublons
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('logements')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        $now = Carbon::now();

        // On récupère les IDs des types logement
        $pv = DB::table('type_logements')->where('type', 'PV')->first();
        $pj = DB::table('type_logements')->where('type', 'PJ')->first();
        $bm = DB::table('type_logements')->where('type', 'BM')->first();
        $br = DB::table('type_logements')->where('type', 'BR')->first();
        $bloc = DB::table('type_logements')->where('type', 'Bloc')->first();

        // Insérer quelques logements exemples
        DB::table('logements')->insert([
            [
                'name' => 'PVD10', 
                'nbrPlace' => 6, 
                'type_logement_id' => $pv->id, 
                'created_at' => $now, 
                'updated_at' => $now
            ],
            [
                'name' => 'PJF60', 
                'nbrPlace' => 1, 
                'type_logement_id' => $pj->id, 
                'created_at' => $now, 
                'updated_at' => $now
            ],
            [
                'name' => 'BM-73', 
                'nbrPlace' => 2, 
                'type_logement_id' => $bm->id, 
                'created_at' => $now, 
                'updated_at' => $now
            ],
            [
                'name' => 'BR‑213', 
                'nbrPlace' => 1, 
                'type_logement_id' => $br->id, 
                'created_at' => $now, 
                'updated_at' => $now
            ],
            [
                'name' => 'Bloc‑C02', 
                'nbrPlace' => 25, 
                'type_logement_id' => $bloc->id, 
                'created_at' => $now, 
                'updated_at' => $now
            ],
        ]);
    }
}
