<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Crear Producto</title>
</head>
<body>

<h1>Crear Producto</h1>

@if($errors->any())
    <div style="color:red;">
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form method="POST" action="{{ route('products.store') }}">
    @csrf

    <label>Nombre:</label><br>
    <input type="text" name="name"><br><br>

    <label>Descripción:</label><br>
    <textarea name="description"></textarea><br><br>

    <label>Precio:</label><br>
    <input type="number" step="0.01" name="unit_price"><br><br>

    <label>Stock:</label><br>
    <input type="number" name="stock"><br><br>

    <label>Imagen URL:</label><br>
    <input type="text" name="image_url"><br><br>

    <label>Categoría ID:</label><br>
    <select name="category_id" required>
    <option value="">Seleccione una categoría</option>
        @foreach($categories as $category)
            <option value="{{ $category->id }}">
                {{ $category->name }}
            </option>
        @endforeach
    </select>
    <br><br>

    <label>Usuario ID:</label><br>
    <select name="updated_by" required>
        <option value="">Seleccione un usuario</option>
        @foreach($users as $user)
            <option value="{{ $user->id }}">
                {{ $user->name }}
            </option>
        @endforeach
    </select>
    <br><br>

    <button type="submit">Guardar</button>
</form>

<a href="/products">Volver</a>

</body>
</html>
