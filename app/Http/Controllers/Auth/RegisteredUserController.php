<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        // Assure-toi de passer les relations nécessaires (établissements, niveaux, classes, logements)
        $etablissements = \App\Models\Etablissement::all();
        $niveaux = \App\Models\Niveau::all();
        $classes = \App\Models\Classe::all();
        $logements = \App\Models\Logement::all();

        return Inertia::render('Auth/Register', [
            'etablissements' => $etablissements,
            'niveaux' => $niveaux,
            'classes' => $classes,
            'logements' => $logements,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validation des champs
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'contact' => 'required|string|max:20', 
            'etablissement_id' => 'required|exists:etablissements,id',
            'niveau_id' => 'required|exists:niveaux,id',
            'classe_id' => 'required|exists:classes,id',
            'logement_id' => 'required|exists:logements,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // validation de l’image
        ]);

        // Si une image est envoyée, on la stocke
        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            // Stocker dans le disque public (ou selon ton disk)
            $imagePath = $image->store('avatars', 'public');
        }

        // Créer l'utilisateur
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'contact' => $validated['contact'],
            'password' => Hash::make($validated['password']),
            'etablissement_id' => $validated['etablissement_id'],
            'niveau_id' => $validated['niveau_id'],
            'classe_id' => $validated['classe_id'],
            'logement_id' => $validated['logement_id'],
            'image' => $imagePath, // peut être null
        ]);

        // Assigner le rôle "Membre"
        $user->assignRole('Membres');

        // Déclencher l'événement Registered (si tu l’utilises)
        event(new Registered($user));

        // Connexion automatique
        //Auth::login($user);

        return redirect(route('membres.index'));
    }
}
