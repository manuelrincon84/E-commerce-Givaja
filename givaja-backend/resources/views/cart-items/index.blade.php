<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artículos del Carrito - Givaja</title>
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
            <h2>Artículos del Carrito</h2>
            <a href="{{ route('cart-items.create') }}" class="btn" style="background-color: #6fcf97; color: white; border-radius: 10px; padding: 10px 20px;">+ Agregar Artículo</a>
        </div>

        @if (session('success'))
            <div class="alert alert-success alert-dismissible fade show">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @if ($cartItems->isEmpty())
            <div class="alert alert-warning">No hay artículos. <a href="{{ route('cart-items.create') }}">Agregar uno</a></div>
        @else
            <table class="table table-hover table-striped">
                <thead style="background-color: #6fcf97; color: white;">
                    <tr>
                        <th>ID</th>
                        <th>Carrito ID</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($cartItems as $item)
                        <tr>
                            <td>{{ $item->id }}</td>
                            <td>#{{ $item->cart_id }}</td>
                            <td>{{ $item->product->name }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>${{ number_format($item->product->unit_price, 2) }}</td>
                            <td>${{ number_format($item->quantity * $item->product->unit_price, 2) }}</td>
                            <td>
                                <a href="{{ route('cart-items.show', $item->id) }}" class="btn btn-sm btn-info">Ver</a>
                                <a href="{{ route('cart-items.edit', $item->id) }}" class="btn btn-sm btn-warning">Editar</a>
                                <form action="{{ route('cart-items.destroy', $item->id) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('¿Está seguro?')">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{ $cartItems->links() }}
        @endif
                </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
