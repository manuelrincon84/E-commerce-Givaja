<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Pago - Givaja</title>
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
                <h1 class="mb-4">Pago #{{ $payment->id }}</h1>

                <div class="card">
                    <div class="card-body">
                        <p><strong>Orden:</strong> #{{ $payment->order_id }}</p>
                        <p><strong>Fecha de Pago:</strong> {{ $payment->payment_date->format('d/m/Y H:i') }}</p>
                        <p><strong>Monto:</strong> <span class="h5">${{ number_format($payment->amount, 2) }}</span></p>
                        <p><strong>Estado:</strong> <span class="badge bg-info">{{ ucfirst($payment->payment_status) }}</span></p>
                        <hr>
                        <p><strong>Creado:</strong> {{ $payment->created_at->format('d/m/Y H:i') }}</p>
                        <p><strong>Actualizado:</strong> {{ $payment->updated_at->format('d/m/Y H:i') }}</p>
                    </div>
                </div>

                <div class="mt-3 d-flex gap-2">
                    <a href="{{ route('payments.edit', $payment->id) }}" class="btn btn-warning">Editar</a>
                    <a href="{{ route('payments.index') }}" class="btn btn-secondary">Volver</a>
                    <form action="{{ route('payments.destroy', $payment->id) }}" method="POST" style="display:inline;">
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
