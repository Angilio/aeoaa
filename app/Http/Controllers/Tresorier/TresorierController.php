<?php

namespace App\Http\Controllers\Tresorier;

use App\Http\Controllers\Controller;
use App\Models\Entree;
use App\Models\Sortie;
use App\Models\User;
use App\Models\RessFinanciere;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TresorierController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Tresorier/Dashboard');
    }

    public function rapports()
    {
        return Inertia::render('Tresorier/Rapports');
    }

    // --- Finances ---
    public function finances()
    {
        return Inertia::render('Tresorier/Finances', [
            'ressources' => RessFinanciere::latest()->get(),
            'entrees' => Entree::with('ressource', 'user')->latest()->get(),
            'sorties' => Sortie::latest()->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    // --- Calcul du solde ---
    private function getSolde()
    {
        $totalEntrees = Entree::sum('montant');
        $totalSorties = Sortie::sum('montant');

        return $totalEntrees - $totalSorties;
    }

    // --- Entrées ---
    public function entrees()
    {
        return Inertia::render('Tresorier/Entrees', [
            'entrees' => Entree::with('ressource')->latest()->get(),
            'ressources' => RessFinanciere::latest()->get(),
        ]);
    }

    // --- Sorties ---
    public function sorties()
    {
        return Inertia::render('Tresorier/Sorties', [
            'sorties' => Sortie::latest()->get(),
        ]);
    }

    public function storeEntree(Request $request)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:1',
            'raison' => 'nullable|string|max:255',
            'ressource_id' => 'required|exists:ress_financieres,id',
            'user_id' => 'required|exists:users,id', // 🔥 nouveau
        ]);

        Entree::create([
            'montant' => $validated['montant'],
            'raison' => $validated['raison'] ?? null,
            'ress_financiere_id' => $validated['ressource_id'],
            'user_id' => $validated['user_id'], // 🔥 assignation de l'utilisateur
        ]);

        return back()->with('success', 'Entrée ajoutée avec succès.');
    }


    // storeSortie
    public function storeSortie(Request $request)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:1', // empêche montant nul ou négatif
            'raison' => 'nullable|string|max:255',
        ]);

        $soldeActuel = $this->getSolde();

        if ($validated['montant'] > $soldeActuel) {
            return back()->withErrors([
                'montant' => 'Solde insuffisant pour effectuer cette sortie.'
            ]);
        }

        Sortie::create([
            'montant' => $validated['montant'],
            'raison' => $validated['raison'] ?? null,
        ]);

        return back()->with('success', 'Sortie ajoutée avec succès.');
    }
}
