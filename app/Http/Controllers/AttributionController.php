<?php

namespace App\Http\Controllers;

use App\Models\Attribution;
use App\Models\User;
use App\Models\Logement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PDF; // Si tu as installé barryvdh/laravel-dompdf

class AttributionController extends Controller
{
    // Affiche toutes les attributions
    public function index()
    {
        $attributions = Attribution::with(['user', 'logement'])->get();

        return Inertia::render('Attributions/Index', [
            'attributions' => $attributions,
        ]);
    }

    // Formulaire pour créer une attribution multiple
    public function create()
    {
        $users = User::role(['Membres', 'Président', 'Commission de logement'])->get(); // tous les roles si nécessaire
        $logements = Logement::all();

        return Inertia::render('Attributions/Create', [
            'users' => $users,
            'logements' => $logements,
        ]);
    }

    // Enregistrer les attributions multiples
    public function store(Request $request)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'logement_id' => 'required|exists:logements,id',
            'date_debut' => 'required|date',
            'date_fin' => 'nullable|date|after_or_equal:date_debut',
        ]);

        foreach ($request->user_ids as $userId) {
            Attribution::create([
                'user_id' => $userId,
                'logement_id' => $request->logement_id,
                'date_debut' => $request->date_debut,
                'date_fin' => $request->date_fin,
            ]);
        }

        return redirect()->route('attributions.index')->with('success', 'Attributions enregistrées avec succès.');
    }

    // Formulaire pour éditer une attribution
    public function edit(Attribution $attribution)
    {
        $users = User::role(['Membres', 'Président', 'Commission de logement'])->get();
        $logements = Logement::all();

        return Inertia::render('Attributions/Edit', [
            'attribution' => $attribution,
            'users' => $users,
            'logements' => $logements,
        ]);
    }

    // Mettre à jour une attribution
    public function update(Request $request, Attribution $attribution)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'logement_id' => 'required|exists:logements,id',
            'date_debut' => 'required|date',
            'date_fin' => 'nullable|date|after_or_equal:date_debut',
        ]);

        $attribution->update($request->only(['user_id', 'logement_id', 'date_debut', 'date_fin']));

        return redirect()->route('attributions.index')->with('success', 'Attribution mise à jour.');
    }

    // Supprimer une attribution
    public function destroy(Attribution $attribution)
    {
        $attribution->delete();

        return redirect()->route('attributions.index')->with('success', 'Attribution supprimée.');
    }

    // Exporter toutes les attributions en PDF
    public function exportPdf()
    {
        $attributions = Attribution::with(['user', 'logement'])->get();

        $pdf = PDF::loadView('attributions.pdf', [
            'attributions' => $attributions
        ]);

        return $pdf->download('attributions.pdf');
    }
}
