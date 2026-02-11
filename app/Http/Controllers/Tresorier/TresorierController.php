<?php

namespace App\Http\Controllers\Tresorier;
use App\Http\Controllers\Controller;
use App\Models\Entree;
use App\Models\Sortie;
use App\Models\Caisse;
use App\Models\RessFinanciere;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TresorierController extends Controller
{

    public function rapports()
    {
        return Inertia::render('Tresorier/Rapports');
    }

    public function dashboard()
    {
        return Inertia::render('Tresorier/Dashboard');
    }

    // --- Finances ---
    public function finances()
    {
        return Inertia::render('Tresorier/Finances', [
            'ressources' => RessFinanciere::latest()->get(),
            'entrees' => Entree::with('ressource')->latest()->get(),
            'sorties' => Sortie::latest()->get(),
        ]);
    }

    // --- Entrées ---
    public function entrees()
    {
        return Inertia::render('Tresorier/Entrees', [
            'entrees' => Entree::with('ressource')->latest()->get(),
            'ressources' => RessFinanciere::latest()->get(),
        ]);
    }

    public function storeEntree(Request $request)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric',
            'raison' => 'nullable|string|max:255',
            'ressource_id' => 'required|exists:ress_financieres,id',
        ]);

        // On prend la première caisse pour simplifier (ou ajouter la logique de sélection)
        $caisse = Caisse::firstOrCreate([]);

        Entree::create([
            'montant' => $validated['montant'],
            'raison' => $validated['raison'] ?? null,
            'ress_financiere_id' => $validated['ressource_id'],
            'caisse_id' => $caisse->id,
        ]);

        return back()->with('success', 'Entrée ajoutée avec succès.');
    }

    // --- Sorties ---
    public function sorties()
    {
        return Inertia::render('Tresorier/Sorties', [
            'sorties' => Sortie::latest()->get(),
        ]);
    }

    public function storeSortie(Request $request)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric',
            'raison' => 'nullable|string|max:255',
        ]);

        $caisse = Caisse::firstOrCreate([]);

        Sortie::create([
            'montant' => $validated['montant'],
            'raison' => $validated['raison'] ?? null,
            'caisse_id' => $caisse->id,
        ]);

        return back()->with('success', 'Sortie ajoutée avec succès.');
    }
}

