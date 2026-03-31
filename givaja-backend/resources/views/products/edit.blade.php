<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Tu CSS -->
    <link rel="stylesheet" href="{{ asset('css/products.css') }}">
</head>
<body style="background-color: #f2f2f2; color: #333;">

<div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">

    <div class="card shadow p-4" style="width: 840px; border-radius: 20px; border: 2px solid #6fcf97; background-color: #e9e9e9;">

        <h3 class="text-center mb-4">Editar Producto</h3>

        @if($errors->any())
            <div class="alert alert-danger">
                <ul class="mb-0">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('products.update', $product) }}">
            @csrf
            @method('PUT')

            <!-- Fila 1: Nombre y Precio -->
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Nombre:</label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $product->name) }}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Precio:</label>
                        <input type="number" step="0.01" name="unit_price" class="form-control" value="{{ old('unit_price', $product->unit_price) }}">
                    </div>
                </div>
            </div>

            <!-- Fila 2: Descripción (columna completa) -->
            <div class="row">
                <div class="col-md-12">
                    <div class="mb-3">
                        <label class="form-label">Descripción:</label>
                        <textarea name="description" class="form-control">{{ old('description', $product->description) }}</textarea>
                    </div>
                </div>
            </div>

            <!-- Fila 3: Stock e Imagen URL -->
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Stock:</label>
                        <input type="number" name="stock" class="form-control" value="{{ old('stock', $product->stock) }}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Imagen URL:</label>
                        <input type="text" name="image_url" class="form-control" value="{{ old('image_url', $product->image_url) }}">
                    </div>
                </div>
            </div>

            <!-- Fila 4: Categoría y Usuario -->
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Categoría:</label>
                        <select name="category_id" class="form-select" required>
                            <option value="">Seleccione una categoría</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}"
                                    {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Usuario:</label>
                        <select name="updated_by" class="form-select" required>
                            <option value="">Seleccione un usuario</option>
                            @foreach($users as $user)
                                <option value="{{ $user->id }}"
                                    {{ old('updated_by', $product->updated_by) == $user->id ? 'selected' : '' }}>
                                    {{ $user->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn w-100" style="background-color: #6fcf97; color: white; border-radius: 10px;">
                Actualizar
            </button>
        </form>

        <a href="/products" class="btn w-100 mt-3" style="border: 2px solid #6fcf97; color: #6fcf97; border-radius: 10px;">
            Volver
        </a>

    </div>

</div>

</body>
</html>
