<?php

namespace App\Http\Controllers\Tresorier;

use App\Http\Controllers\Controller;
use App\Models\Entree;
use App\Models\Sortie;
use App\Models\User;
use App\Models\RessFinanciere;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class TresorierController extends Controller
{
    public function dashboard(Request $request)
    {
        // Année sélectionnée (ou l'année en cours par défaut)
        $annee = $request->query('annee', now()->year);

        // Liste des années avec des entrées ou sorties
        $annees = Entree::selectRaw('YEAR(created_at) as year')
            ->union(
                Sortie::selectRaw('YEAR(created_at) as year')
            )
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        // Totaux par mois pour l'année sélectionnée
        $totauxMois = collect(range(1, 12))->mapWithKeys(function ($mois) use ($annee) {
            $totalEntrees = Entree::whereYear('created_at', $annee)
                ->whereMonth('created_at', $mois)
                ->sum('montant');

            $totalSorties = Sortie::whereYear('created_at', $annee)
                ->whereMonth('created_at', $mois)
                ->sum('montant');

            return [$mois => [
                'entrees' => $totalEntrees,
                'sorties' => $totalSorties,
                'solde' => $totalEntrees - $totalSorties,
            ]];
        });

        return Inertia::render('Tresorier/Dashboard', [
            'annees' => $annees,
            'annee_selectionnee' => (int)$annee,
            'totauxMois' => $totauxMois,
        ]);
    }

    public function rapports(Request $request)
    {
        $filtre = $request->query('filtre', 'tous');

        // Tous les utilisateurs avec leurs logements
        $users = User::with('logement')->get();

        $membres = $users->map(function ($user) {

            // Vérifie si l'utilisateur a payé le droit annuel (ress_financiere_id = 2)
            $aPaye = Entree::where('user_id', $user->id)
                ->where('ress_financiere_id', 2)
                ->exists();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'adresse' => optional($user->logement->first())->name ?? 'Non attribué',
                'paye' => $aPaye,
            ];
        });

        // 🎯 Filtrage
        if ($filtre === 'actifs') {
            $membres = $membres->where('paye', true);
        } elseif ($filtre === 'non_actifs') {
            $membres = $membres->where('paye', false);
        }

        $totalMembres = $membres->count();

        return Inertia::render('Tresorier/Rapports', [
            'membres' => $membres->values(),
            'totalMembres' => $totalMembres,
            'filtre' => $filtre,
        ]);
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

    public function storeRessource(Request $request)
    {
        $validated = $request->validate([
            'ressource' => 'required|string|max:255|unique:ress_financieres,ressource',
        ]);

        RessFinanciere::create([
            'ressource' => $validated['ressource'],
        ]);

        return back()->with('success', 'Ressource financière ajoutée avec succès.');
    }


    public function exportRapportPdf(Request $request)
    {
        $filtre = $request->query('filtre', 'tous');

        $users = User::with('logement')->get();

        $membres = $users->map(function ($user) {

            $aPaye = Entree::where('user_id', $user->id)
                ->where('ress_financiere_id', 2)
                ->exists();

            return [
                'name' => $user->name,
                'adresse' => optional($user->logement->first())->name ?? 'Non attribué',
                'paye' => $aPaye,
            ];
        });

        if ($filtre === 'actifs') {
            $membres = $membres->where('paye', true);
        } elseif ($filtre === 'non_actifs') {
            $membres = $membres->where('paye', false);
        }

        $totalMembres = $membres->count();

        $pdf = Pdf::loadView('rapports.pdf', [
            'membres' => $membres,
            'totalMembres' => $totalMembres,
        ]);

        return $pdf->download('rapport_membres_droit_annuel.pdf');
    }
}
