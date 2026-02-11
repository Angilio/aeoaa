<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Niveau;
use App\Models\Logement;
use App\Models\TypeLogement;
use App\Models\Etablissement;
use App\Models\Classe;
use Spatie\Permission\Models\Role; // ⚡ Pour récupérer les rôles
use Inertia\Inertia;
use Illuminate\Http\Request;

class MembreController extends Controller
{
    public function index(Request $request)
    {
        // Charger toutes les options pour les filtres
        $roles = Role::all(); // Tous les rôles existants
        $niveaux = Niveau::all();
        $logements = Logement::all();
        $typesLogements = TypeLogement::all();
        $etablissements = Etablissement::all();
        $classes = Classe::all();

        // Query principal
        $query = User::query()
            ->with(['roles', 'niveau', 'logement.typeLogement', 'classe', 'etablissement']);

        // Recherche par nom
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filtres
        if ($request->filled('role')) {
            $query->whereHas('roles', fn($q) => $q->where('id', $request->role));
        }

        if ($request->filled('niveau')) {
            $query->where('niveau_id', $request->niveau);
        }

        if ($request->filled('logement')) {
            $query->where('logement_id', $request->logement);
        }

        if ($request->filled('type_logement')) {
            $query->whereHas('logement.typeLogement', fn($q) => $q->where('id', $request->type_logement));
        }

        if ($request->filled('classe')) {
            $query->where('classe_id', $request->classe);
        }

        if ($request->filled('etablissement')) {
            $query->where('etablissement_id', $request->etablissement);
        }

        $membres = $query->paginate(10)->withQueryString();

        return Inertia::render('President/Membres/Index', [
            'membres' => $membres,
            'filters' => $request->only(['search', 'role', 'niveau', 'logement', 'type_logement', 'classe', 'etablissement']),
            'roles' => $roles,
            'niveaux' => $niveaux,
            'logements' => $logements,
            'typesLogements' => $typesLogements,
            'etablissements' => $etablissements,
            'classes' => $classes,
        ]);
    }

    public function dashboard()
    {
        // Récupérer chaque type de logement avec le nombre de membres qui y sont attribués
        $typesLogements = TypeLogement::withCount(['logements as membres_count' => function ($query) {
            $query->withCount('users'); // compter les utilisateurs dans chaque logement
        }])->get();

        // Calculer le nombre total de membres
        $totalMembres = \App\Models\User::count();

        return Inertia::render('President/Dashboard', [
            'typesLogements' => $typesLogements,
            'totalMembres' => $totalMembres,
        ]);
    }
}
