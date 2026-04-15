<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Categoría - Givaja E-commerce</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Givaja</a>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="mb-4">Detalles de la Categoría</h1>

                <div class="card">
                    <div class="card-body">
                        <p><strong>ID:</strong> {{ $category->id }}</p>
                        <p><strong>Nombre:</strong> {{ $category->name }}</p>
                        <p><strong>Descripción:</strong> {{ $category->description }}</p>
                        <p><strong>Creado:</strong> {{ $category->created_at->format('d/m/Y H:i') }}</p>
                        <p><strong>Actualizado:</strong> {{ $category->updated_at->format('d/m/Y H:i') }}</p>
                        <p><strong>Productos:</strong> {{ $category->products->count() }}</p>
                    </div>
                </div>

                <div class="mt-3 d-flex gap-2">
                    <a href="{{ route('categories.edit', $category->id) }}" class="btn btn-warning">Editar</a>
                    <a href="{{ route('categories.index') }}" class="btn btn-secondary">Volver</a>
                    <form action="{{ route('categories.destroy', $category->id) }}" method="POST" style="display:inline;">
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
