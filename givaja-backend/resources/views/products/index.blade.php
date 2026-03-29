<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>
<body>

<h1>Productos</h1>

<a href="{{ route('products.create') }}">+ Crear Producto</a>

<table>
    <thead>
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
        @foreach($products as $product)
        <tr>
            <td>{{ $product->id }}</td>
            <td>{{ $product->name }}</td>
            <td>{{ $product->description }}</td>
            <td>{{ $product->unit_price }}</td>
            <td>{{ $product->stock }}</td>
            <td>
                @if($product->image_url)
                    <img src="{{ $product->image_url }}" width="50">
                @endif
            </td>
            <td>{{ $product->category->name ?? 'Sin categoría' }}</td>
            <td>{{ $product->updatedByUser->name ?? 'Sin usuario' }}</td>
            <td>
                <a href="{{ route('products.show', $product) }}">Ver</a>
                <a href="{{ route('products.edit', $product) }}">Editar</a>

                <form method="POST" action="{{ route('products.destroy', $product) }}" style="display:inline;" onsubmit="return confirm('¿Estás seguro?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
