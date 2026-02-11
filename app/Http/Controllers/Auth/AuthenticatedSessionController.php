<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        // Map rôle => route
        $roleRedirects = [
            'Commission de logement' => 'dashboard.logements',
            'Président' => 'president.dashboard',
            'Membres' => 'dashboard',
        ];

        // Vérifier les rôles de l'utilisateur et rediriger vers la première route correspondante
        foreach ($user->getRoleNames() as $role) {
            if (isset($roleRedirects[$role])) {
                return redirect()->route($roleRedirects[$role]);
            }
        }

        // Redirection par défaut si aucun rôle trouvé
        return redirect()->route('dashboard');
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
