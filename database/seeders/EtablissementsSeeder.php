<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class EtablissementsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        DB::table('etablissements')->insert([
            ['name' => 'Faculté des Sciences', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Faculté des Lettres et Sciences Humaines', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Faculté de Médecine', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'DEGSP (Droit, Économie, Gestion, Science Politique)', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'ENSET (École Normale Supérieure Technique)', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'ESP (École Supérieure Polytechnique)', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'ESAED (École Supérieure Agronomie & Environnement de Diego)', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'ISAE (Institut Supérieur d’Administration d’Entreprise)', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Institut Universitaire Science Environnement & Société (IUSES)', 'created_at' => $now, 'updated_at' => $now],
            // Tu peux ajouter l'IST-D si besoin
            // ['name' => 'Institut Supérieur de Technologie Antsiranana', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
