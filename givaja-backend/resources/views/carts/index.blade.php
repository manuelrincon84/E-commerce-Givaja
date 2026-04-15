<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carritos - Givaja</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body style="background-color: #f2f2f2; color: #333;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Givaja</a>
        </div>
    </nav>

    <div class="container-fluid px-5 py-5">
        <div class="card shadow p-4" style="border-radius: 20px; border: 2px solid #6fcf97; background-color: #e9e9e9;">
                    <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Carritos</h2>
            <a href="{{ route('carts.create') }}" class="btn" style="background-color: #6fcf97; color: white; border-radius: 10px; padding: 10px 20px;">+ Crear Carrito</a>
        </div>

        @if (session('success'))
            <div class="alert alert-success alert-dismissible fade show">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @if ($carts->isEmpty())
            <div class="alert alert-warning">No hay carritos. <a href="{{ route('carts.create') }}">Crear uno</a></div>
        @else
            <table class="table table-hover table-striped">
                <thead style="background-color: #6fcf97; color: white;">
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Items</th>
                        <th>Creado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($carts as $cart)
                        <tr>
                            <td>{{ $cart->id }}</td>
                            <td>{{ $cart->user->first_name }} {{ $cart->user->last_name }}</td>
                            <td>{{ $cart->cartItems->count() }}</td>
                            <td>{{ $cart->created_at->format('d/m/Y') }}</td>
                            <td>
                                <a href="{{ route('carts.show', $cart->id) }}" class="btn btn-sm btn-info">Ver</a>
                                <a href="{{ route('carts.edit', $cart->id) }}" class="btn btn-sm btn-warning">Editar</a>
                                <form action="{{ route('carts.destroy', $cart->id) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('¿Está seguro?')">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{ $carts->links() }}
        @endif
                </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
