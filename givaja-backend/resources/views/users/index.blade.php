<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios - Givaja</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="{{ asset('css/products.css') }}" rel="stylesheet">
</head>
<body style="background-color: #f2f2f2; color: #333;">
    <nav class="navbar navbar-expand-lg" style="background-color: #6fcf97; font-size: medium;">
        <div class="container-fluid">
            <a class="navbar-brand" href="/" style="color: white !important; font-weight: bold;">Givaja</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="{{ route('users.index') }}">Usuarios</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ route('categories.index') }}">Categorías</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ route('products.index') }}">Productos</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid px-5 py-5">
        <div class="card shadow p-4" style="border-radius: 20px; border: 2px solid #6fcf97; background-color: #e9e9e9;">
            <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Usuarios</h2>
                    <a href="{{ route('users.create') }}" class="btn" style="background-color: #6fcf97; color: white; border-radius: 10px; padding: 10px 20px;">
                        + Crear Usuario
                    </a>
                </div>

                @if (session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                <div class="table-responsive">
                    <table class="table table-hover" style="background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <thead style="background-color: #6fcf97; color: white;">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($users as $user)
                            <tr>
                                <td>{{ $user->id }}</td>
                                <td><strong>{{ $user->first_name }}</strong></td>
                                <td>{{ $user->last_name }}</td>
                                <td>{{ $user->email }}</td>
                                <td><span class="badge" style="background-color: #6fcf97;">{{ ucfirst($user->role) }}</span></td>
                                <td>
                                    <a href="{{ route('users.show', $user) }}" class="btn btn-sm" style="border: 2px solid #6fcf97; color: #6fcf97; border-radius: 5px;">Ver</a>
                                    <a href="{{ route('users.edit', $user) }}" class="btn btn-sm" style="background-color: #6fcf97; color: white; border-radius: 5px;">Editar</a>

                                    <form method="POST" action="{{ route('users.destroy', $user) }}" style="display:inline;" onsubmit="return confirm('¿Estás seguro?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm" style="background-color: #dc3545; color: white; border-radius: 5px; border: none;">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="6" class="text-center">No hay usuarios registrados. <a href="{{ route('users.create') }}">Crear uno</a></td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
</body>
</html>
