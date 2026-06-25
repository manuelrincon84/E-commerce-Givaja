<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\ForgotPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    /**
     * Show forgot password form
     */
    public function show(string $locale)
    {
        return Inertia::render('auth/ForgotPassword');
    }

    /**
     * Send password reset link
     */
    public function send(Request $request, string $locale)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Generar token único
        $token = Str::random(64);

        // Guardar token en BD con expiración de 60 minutos
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $validated['email']],
            [
                'token' => Hash::make($token),
                'created_at' => now(),
            ]
        );

        // Enviar email con link de reset
        $resetUrl = url()->signedRoute('password.reset', [
            'locale' => $locale,
            'email' => $validated['email'],
            'token' => $token,
        ]);

        try {
            Mail::to($validated['email'])->send(new ForgotPasswordMail($resetUrl));
            return back()->with('success', __('Check your email for password reset instructions'));
        } catch (\Exception $e) {
            return back()->withErrors(['email' => __('Error sending email. Please try again.')]);
        }
    }

    /**
     * Show reset password form
     */
    public function showReset(Request $request, string $locale)
    {
        $email = $request->query('email');
        $token = $request->query('token');

        if (!$email || !$token) {
            return redirect()->route('home', ['locale' => $locale])->with('error', __('Invalid reset link'));
        }

        // Verificar que el token existe y no ha expirado (60 minutos)
        $reset = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->where('created_at', '>', now()->subMinutes(60))
            ->first();

        if (!$reset || !Hash::check($token, $reset->token)) {
            return redirect()->route('home', ['locale' => $locale])->with('error', __('Reset link expired or invalid'));
        }

        return Inertia::render('auth/ResetPassword', [
            'email' => $email,
            'token' => $token,
        ]);
    }

    /**
     * Update password
     */
    public function reset(Request $request, string $locale)
    {
        $validated = $request->validate([
            'email'    => 'required|email|exists:users,email',
            'token'    => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Verificar token
        $reset = DB::table('password_reset_tokens')
            ->where('email', $validated['email'])
            ->where('created_at', '>', now()->subMinutes(60))
            ->first();

        if (!$reset || !Hash::check($validated['token'], $reset->token)) {
            return back()->withErrors(['email' => __('Invalid or expired reset token')]);
        }

        // Actualizar contraseña
        $user = User::where('email', $validated['email'])->first();
        $user->update(['password' => Hash::make($validated['password'])]);

        // Eliminar token usado
        DB::table('password_reset_tokens')->where('email', $validated['email'])->delete();

        return redirect()->route('login', ['locale' => $locale])
            ->with('success', __('Password reset successfully. Please login with your new password.'));
    }
}
