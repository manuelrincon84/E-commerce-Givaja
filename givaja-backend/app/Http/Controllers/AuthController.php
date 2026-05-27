<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Show login form
     */
    public function showLogin(string $locale)
    {
        if (Auth::check()) {
            return redirect()->route('home', ['locale' => $locale]);
        }

        return Inertia::render('auth/Login');
    }

    /**
     * Handle login
     */
    public function login(Request $request, string $locale)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return redirect()->route('home', ['locale' => $locale]);
        }

        return back()->withErrors([
            'email' => __('auth.failed'),
        ])->onlyInput('email');
    }

    /**
     * Show register form
     */
    public function showRegister(string $locale)
    {
        if (Auth::check()) {
            return redirect()->route('home', ['locale' => $locale]);
        }

        return Inertia::render('auth/Register');
    }

    /**
     * Handle register
     */
    public function register(Request $request, string $locale)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|string|min:8|confirmed',
        ]);

        $validated['password'] = bcrypt($validated['password']);
        $validated['role'] = 'customer';

        $user = User::create($validated);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('home', ['locale' => $locale]);
    }

    /**
     * Handle logout
     */
    public function logout(Request $request, string $locale)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home', ['locale' => $locale]);
    }
}
