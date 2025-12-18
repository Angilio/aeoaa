<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TypeLogementsSeeder extends Seeder
{
    public function run()
    {
        // Si besoin, on vide la table pour éviter les doublons
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        DB::table('type_logements')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        $now = Carbon::now();

        DB::table('type_logements')->insert([
            ['type' => 'PV', 'created_at' => $now, 'updated_at' => $now],
            ['type' => 'PJ', 'created_at' => $now, 'updated_at' => $now],
            ['type' => 'BM', 'created_at' => $now, 'updated_at' => $now],
            ['type' => 'BR', 'created_at' => $now, 'updated_at' => $now],
            ['type' => 'Bloc', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
