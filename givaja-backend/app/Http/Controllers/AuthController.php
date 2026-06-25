<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UserRole;
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
     * Incluye rate limiting: máximo 5 intentos por minuto
     */
    public function login(Request $request, string $locale)
    {
        // Rate limiting: máximo 5 intentos por minuto por IP
        $key = 'login_attempts:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors([
                'email' => __('Too many login attempts. Please try again in :seconds seconds.',
                    ['seconds' => $seconds]),
            ])->onlyInput('email');
        }

        $credentials = $request->validate([
            //'role' => ['required', new Enum(UserRole::class)],
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            RateLimiter::clear($key);
            $request->session()->regenerate();
            return redirect()->route('home', ['locale' => $locale]);
        }

        RateLimiter::hit($key, 60); // Expira en 60 segundos

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
        $validated['role'] = UserRole::Customer;

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
