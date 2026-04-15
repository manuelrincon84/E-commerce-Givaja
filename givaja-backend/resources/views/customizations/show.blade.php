<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Personalización - Givaja</title>
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
                <h1 class="mb-4">Personalización #{{ $customization->id }}</h1>

                <div class="card">
                    <div class="card-body">
                        <p><strong>Producto:</strong> {{ $customization->product->name }}</p>
                        <p><strong>Color:</strong> {{ $customization->color ?? 'No especificado' }}</p>
                        <p><strong>Texto para Grabado:</strong> {{ $customization->engraving_text ?? 'No especificado' }}</p>
                        <p><strong>Material Extra:</strong> {{ $customization->extra_material ?? 'No especificado' }}</p>
                        <p><strong>Precio Adicional:</strong> ${{ number_format($customization->price, 2) }}</p>
                        <p><strong>Creado:</strong> {{ $customization->created_at->format('d/m/Y H:i') }}</p>
                    </div>
                </div>

                <div class="mt-3 d-flex gap-2">
                    <a href="{{ route('customizations.edit', $customization->id) }}" class="btn btn-warning">Editar</a>
                    <a href="{{ route('customizations.index') }}" class="btn btn-secondary">Volver</a>
                    <form action="{{ route('customizations.destroy', $customization->id) }}" method="POST" style="display:inline;">
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
