<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    /**
     * Show profile edit form
     */
    public function edit(string $locale)
    {
        $user = Auth::user();

        return Inertia::render('profile/Edit', [
            'user' => [
                'id'    => $user->id,
                'first_name' => $user->first_name,
                'last_name'  => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'bio'   => $user->bio,
                'address' => $user->address,
                'avatar' => $user->avatar ? Storage::url($user->avatar) : null,
                'role'  => $user->role->value,
            ]
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request, string $locale)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'phone'      => 'nullable|string|max:20',
            'bio'        => 'nullable|string|max:1000',
            'address'    => 'nullable|string|max:500',
            'avatar'     => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
        ]);

        // Manejar upload de avatar
        if ($request->hasFile('avatar')) {
            // Eliminar avatar anterior si existe
            if ($user->avatar && Storage::exists($user->avatar)) {
                Storage::delete($user->avatar);
            }

            // Guardar nuevo avatar
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        // Actualizar usuario
        $user->update($validated);

        return back()->with('success', __('Profile updated successfully'));
    }

    /**
     * Delete user avatar
     */
    public function deleteAvatar(string $locale)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->avatar && Storage::exists($user->avatar)) {
            Storage::delete($user->avatar);
            $user->update(['avatar' => null]);
        }

        return back()->with('success', __('Avatar deleted successfully'));
    }
}
