<?php

namespace App\Http\Controllers;

use App\Models\Attribution;
use App\Models\User;
use App\Models\Logement;
use App\Models\TypeLogement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
//use PDF; // Si tu as installé barryvdh/laravel-dompdf

class AttributionController extends Controller
{
    public function index()
    {
        // Charger user, ses roles et logement
        $attributions = Attribution::with(['user.roles', 'logement'])->get();

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

    public function store(Request $request)
    {
        $request->validate([
            'attributions' => 'required|array',
            'attributions.*.logement_id' => 'required|exists:logements,id',
            'attributions.*.user_ids' => 'required|array|min:1',
            'attributions.*.user_ids.*' => 'exists:users,id',
            'attributions.*.date_debut' => 'required|date',
            'attributions.*.date_fin' => 'nullable|date|after_or_equal:attributions.*.date_debut',
        ]);

        foreach ($request->attributions as $attr) {
            foreach ($attr['user_ids'] as $userId) {
                Attribution::create([
                    'user_id'     => (int) $userId,
                    'logement_id' => (int) $attr['logement_id'],
                    'date_debut'  => $attr['date_debut'],
                    'date_fin'    => $attr['date_fin'] ?? null,
                ]);
            }
        }

        return redirect()
            ->route('attributions.index')
            ->with('success', 'Attributions enregistrées avec succès.');
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

    public function exportPdf()
    {
        // Charger toutes les attributions avec relations user.roles et logement
        $attributions = Attribution::with(['user.roles', 'logement'])->get();

        // Charger la vue Blade
        $pdf = Pdf::loadView('attributions.pdf', [
            'attributions' => $attributions
        ]);

        // Définir le format de page et orientation (optionnel)
        $pdf->setPaper('A4', 'portrait');

        // Télécharger le PDF
        return $pdf->download('attributions.pdf');
    }

    public function dashboard()
    {
        $logementsParType = TypeLogement::withCount('logements')->get();
        $totalLogements = $logementsParType->sum('logements_count');

        return Inertia::render('Logements/Dashboard', [
            'logementsParType' => $logementsParType,
            'totalLogements' => $totalLogements
        ]);
    }

}
