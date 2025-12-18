<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class NiveauxSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        DB::table('niveaux')->insert([
            ['name' => 'Licence', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Master', 'created_at' => $now, 'updated_at' => $now],
            // si tu as d'autres niveaux, tu peux les ajouter ici
        ]);
    }
}
