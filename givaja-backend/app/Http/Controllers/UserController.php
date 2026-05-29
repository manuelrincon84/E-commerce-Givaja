<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UserRole;
use stdClass;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index(Request $request, string $locale)
    {
        $search = $request->input('search', '');

        $query = User::query();

        if ($search) {
            $query->search($search);
        }

        $users = $query->paginate(15);
        return Inertia::render('users/Index', ['users' => $users, 'search' => $search]);
    }

    /**
     * Show the form for creating a new user
     */
    public function create(string $locale)
    {
        return Inertia::render('users/Create');
    }

    /**
     * Store a newly created user in storage
     */
    public function store(Request $request, string $locale)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => ['required', new Enum(UserRole::class)],
        ]);

        $validated['password'] = bcrypt($validated['password']);
        User::create($validated);

        return redirect()->route('users.index', ['locale' => $locale])->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified user
     */
    public function show(string $locale, User $user)
    {
        return Inertia::render('users/Show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(string $locale, User $user)
    {
        return Inertia::render('users/Edit', ['user' => $user]);
    }

    /**
     * Update the specified user in storage
     */
    public function update(Request $request, string $locale, User $user)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => ['required', new Enum(UserRole::class)],
        ]);

        if ($request->filled('password')) {
            $validated['password'] = bcrypt($request->password);
        }

        $user->update($validated);

        return redirect()->route('users.index', ['locale' => $locale])->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified user from storage
     */
    public function destroy(string $locale, User $user)
    {
        $user->delete();
        return redirect()->route('users.index', ['locale' => $locale])->with('success', 'Usuario eliminado exitosamente.');
    }
}
