<?php

namespace App\Http\Controllers;

use App\Models\Logement;
use App\Models\TypeLogement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LogementController extends Controller
{
    public function index()
    {        
        $logements = Logement::with('typeLogement')->get();
              
        return Inertia::render('Logements/Index', [
            'logements' => $logements,
        ]);
    }

    public function create()
    {
        return Inertia::render('Logements/Create', [
            'types' => TypeLogement::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'nbrPlace' => 'required|integer|min:1',
            'type_logement_id' => 'required|exists:type_logements,id',
        ]);

        Logement::create($validated);

        return redirect()->route('logements.index')
            ->with('success', 'Logement ajouté avec succès');
    }

    public function edit(Logement $logement)
    {
        return Inertia::render('Logements/Edit', [
            'logement' => $logement,
            'types' => TypeLogement::all(),
        ]);
    }

    public function update(Request $request, Logement $logement)
    {
        $validated = $request->validate([
            'name' => 'required',
            'nbrPlace' => 'required|integer|min:1',
            'type_logement_id' => 'required|exists:type_logements,id',
        ]);

        $logement->update($validated);

        return redirect()->route('logements.index')
            ->with('success', 'Logement modifié');
    }

    public function destroy(Logement $logement)
    {
        $logement->delete();

        return redirect()->route('logements.index')
            ->with('success', 'Logement supprimé');
    }
}
