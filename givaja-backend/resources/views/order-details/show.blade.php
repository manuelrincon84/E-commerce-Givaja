<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Detalle - Givaja</title>
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
            <div class="col-md-6 offset-md-3">
                <h1 class="mb-4">Detalle de Orden #{{ $orderDetail->order_id }}</h1>

                <div class="card">
                    <div class="card-body">
                        <p><strong>ID:</strong> {{ $orderDetail->id }}</p>
                        <p><strong>Orden:</strong> #{{ $orderDetail->order_id }}</p>
                        <p><strong>Producto:</strong> {{ $orderDetail->product->name }}</p>
                        <p><strong>Cantidad:</strong> {{ $orderDetail->quantity }}</p>
                        <p><strong>Precio Unitario:</strong> ${{ number_format($orderDetail->unit_price, 2) }}</p>
                        <p><strong>Subtotal:</strong> ${{ number_format($orderDetail->quantity * $orderDetail->unit_price, 2) }}</p>
                    </div>
                </div>

                <div class="mt-3 d-flex gap-2">
                    <a href="{{ route('order-details.edit', $orderDetail->id) }}" class="btn btn-warning">Editar</a>
                    <a href="{{ route('order-details.index') }}" class="btn btn-secondary">Volver</a>
                    <form action="{{ route('order-details.destroy', $orderDetail->id) }}" method="POST" style="display:inline;">
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
