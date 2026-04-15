<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Producto - Givaja</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navegación -->
    <nav class="navbar navbar-dark" style="background-color: #6fcf97;">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Givaja</a>
            <div class="d-flex gap-2">
                <a href="{{ route('products.index') }}" class="btn btn-light btn-sm">Productos</a>
                <a href="{{ route('categories.index') }}" class="btn btn-light btn-sm">Categorías</a>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        <div class="card shadow">
            <div class="card-header" style="background-color: #6fcf97; color: white;">
                <h5 class="mb-0">Detalle del Producto</h5>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>ID:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->id }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Nombre:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->name }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Descripción:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->description ?? 'N/A' }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Precio:</strong>
                    </div>
                    <div class="col-md-10">
                        ${{ number_format($product->unit_price, 2) }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Stock:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->stock }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Imagen URL:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->image_url ?? 'N/A' }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Categoría:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->category->name ?? 'Sin categoría' }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Actualizado por:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->updatedByUser->first_name ?? 'Sin usuario' }} {{ $product->updatedByUser->last_name ?? '' }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Creado:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->created_at->format('d/m/Y H:i') }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-2">
                        <strong>Actualizado:</strong>
                    </div>
                    <div class="col-md-10">
                        {{ $product->updated_at->format('d/m/Y H:i') }}
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex gap-2">
                <a href="{{ route('products.edit', $product) }}" class="btn btn-warning">Editar</a>
                <a href="{{ route('products.index') }}" class="btn btn-secondary">Volver</a>
                <form action="{{ route('products.destroy', $product) }}" method="POST" class="ms-auto">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger" onclick="return confirm('¿Está seguro?')">Eliminar</button>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
