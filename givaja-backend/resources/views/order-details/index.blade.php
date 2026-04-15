<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles de Órdenes - Givaja</title>
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
            <h2>Detalles de Órdenes</h2>
            <a href="{{ route('order-details.create') }}" class="btn" style="background-color: #6fcf97; color: white; border-radius: 10px; padding: 10px 20px;">+ Crear Detalle</a>
        </div>

        @if (session('success'))
            <div class="alert alert-success alert-dismissible fade show">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @if ($orderDetails->isEmpty())
            <div class="alert alert-warning">No hay detalles. <a href="{{ route('order-details.create') }}">Crear uno</a></div>
        @else
            <table class="table table-hover table-striped">
                <thead style="background-color: #6fcf97; color: white;">
                    <tr>
                        <th>ID</th>
                        <th>Orden ID</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($orderDetails as $detail)
                        <tr>
                            <td>{{ $detail->id }}</td>
                            <td>#{{ $detail->order_id }}</td>
                            <td>{{ $detail->product->name }}</td>
                            <td>{{ $detail->quantity }}</td>
                            <td>${{ number_format($detail->unit_price, 2) }}</td>
                            <td>${{ number_format($detail->quantity * $detail->unit_price, 2) }}</td>
                            <td>
                                <a href="{{ route('order-details.show', $detail->id) }}" class="btn btn-sm btn-info">Ver</a>
                                <a href="{{ route('order-details.edit', $detail->id) }}" class="btn btn-sm btn-warning">Editar</a>
                                <form action="{{ route('order-details.destroy', $detail->id) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('¿Está seguro?')">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{ $orderDetails->links() }}
        @endif
                </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
