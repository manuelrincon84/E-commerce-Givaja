<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Tu CSS -->
    <link rel="stylesheet" href="{{ asset('css/products.css') }}">
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
                    <h2>Productos</h2>
                    <a href="{{ route('products.create') }}" class="btn" style="background-color: #6fcf97; color: white; border-radius: 10px; padding: 10px 20px;">
                        + Crear Producto
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
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Imagen</th>
                                <th>Categoría</th>
                                <th>Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($products as $product)
                            <tr>
                                <td>{{ $product->id }}</td>
                                <td><strong>{{ $product->name }}</strong></td>
                                <td>{{ Str::limit($product->description, 30) }}</td>
                                <td>${{ number_format($product->unit_price, 2) }}</td>
                                <td>
                                    <span class="badge {{ $product->stock > 0 ? 'badge-green' : 'badge-red' }}">
                                        {{ $product->stock }}
                                    </span>
                                </td>
                                <td>
                                    @if($product->image_url)
                                    <img src="{{ $product->image_url }}" width="50" style="border-radius: 5px;">
                                    @else
                                    <span class="text-muted">-</span>
                                    @endif
                                </td>
                                <td>{{ $product->category->name ?? 'Sin categoría' }}</td>
                                <td>{{ $product->updatedByUser->first_name ?? 'Sin usuario' }} {{ $product->updatedByUser->last_name ?? '' }}</td>
                                <td>
                                    <a href="{{ route('products.show', $product) }}" class="btn btn-sm" style="border: 2px solid #6fcf97; color: #6fcf97; border-radius: 5px;">Ver</a>
                                    <a href="{{ route('products.edit', $product) }}" class="btn btn-sm" style="background-color: #6fcf97; color: white; border-radius: 5px;">Editar</a>

                                    <form method="POST" action="{{ route('products.destroy', $product) }}" style="display:inline;" onsubmit="return confirm('¿Estás seguro?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm" style="background-color: #dc3545; color: white; border-radius: 5px; border: none;">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="9" class="text-center">No hay productos registrados. <a href="{{ route('products.create') }}">Crear uno</a></td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                {{ $products->links('pagination::bootstrap-5') }}

            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>

