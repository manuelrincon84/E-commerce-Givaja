<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Producto</title>
</head>
<body>

<h1>Editar Producto</h1>

<form method="POST" action="{{ route('products.update', $product) }}">
    @csrf
    @method('PUT')

    <label>Nombre:</label><br>
    <input type="text" name="name" value="{{ $product->name }}"><br><br>

    <label>Descripción:</label><br>
    <textarea name="description">{{ $product->description }}</textarea><br><br>

    <label>Precio:</label><br>
    <input type="number" step="0.01" name="unit_price" value="{{ $product->unit_price }}"><br><br>

    <label>Stock:</label><br>
    <input type="number" name="stock" value="{{ $product->stock }}"><br><br>

    <label>Imagen URL:</label><br>
    <input type="text" name="image_url" value="{{ $product->image_url }}"><br><br>

    <label>Categoría ID:</label><br>
    <select name="category_id" required>
        <option value="">Seleccione una categoría</option>
        @foreach($categories as $category)
            <option value="{{ $category->id }}"
                {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                {{ $category->name }}
            </option>
        @endforeach
    </select>
<br><br>

    <label>Usuario ID:</label><br>
    <select name="updated_by" required>
        <option value="">Seleccione un usuario</option>
        @foreach($users as $user)
            <option value="{{ $user->id }}"
                {{ old('updated_by', $product->updated_by) == $user->id ? 'selected' : '' }}>
                {{ $user->name }}
            </option>
        @endforeach
    </select>
    <br><br>

    <button type="submit">Actualizar</button>
</form>

<a href="/products">Volver</a>

</body>
</html>
