<?php

namespace App\Http\Controllers\Tresorier;

use App\Http\Controllers\Controller;
use App\Models\RessFinanciere;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TresorierController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Tresorier/Dashboard');
    }

    public function finances()
    {
        return Inertia::render('Tresorier/Finances', [
            'ressources' => RessFinanciere::latest()->get(),
        ]);
    }

    public function storeRessource(Request $request)
    {
        $validated = $request->validate([
            'ressource' => 'required|string|max:255',
        ]);

        RessFinanciere::create($validated);

        return back()->with('success', 'Ressource ajoutée avec succès.');
    }

    public function rapports()
    {
        return Inertia::render('Tresorier/Rapports');
    }
}
