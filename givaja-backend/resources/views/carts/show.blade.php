<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Carrito - Givaja</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Givaja</a>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="mb-4">Carrito #{{ $cart->id }}</h1>

                <div class="card mb-4">
                    <div class="card-body">
                        <p><strong>Usuario:</strong> {{ $cart->user->first_name }} {{ $cart->user->last_name }}</p>
                        <p><strong>Email:</strong> {{ $cart->user->email }}</p>
                        <p><strong>Items:</strong> {{ $cart->cartItems->count() }}</p>
                        <p><strong>Creado:</strong> {{ $cart->created_at->format('d/m/Y H:i') }}</p>
                    </div>
                </div>

                <h5>Artículos del Carrito</h5>
                @if ($cart->cartItems->isEmpty())
                    <p class="text-muted">No hay artículos en este carrito.</p>
                @else
                    <table class="table">
                        <thead> <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($cart->cartItems as $item)
                                <tr>
                                    <td>{{ $item->product->name }}</td>
                                    <td>{{ $item->quantity }}</td>
                                    <td>${{ number_format($item->product->unit_price, 2) }}</td>
                                    <td>${{ number_format($item->quantity * $item->product->unit_price, 2) }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                @endif

                <div class="mt-3 d-flex gap-2">
                    <a href="{{ route('carts.edit', $cart->id) }}" class="btn btn-warning">Editar</a>
                    <a href="{{ route('carts.index') }}" class="btn btn-secondary">Volver</a>
                    <form action="{{ route('carts.destroy', $cart->id) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger" onclick="return confirm('¿Está seguro?')">Eliminar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
