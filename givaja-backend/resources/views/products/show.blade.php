<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Detalle</title>
</head>
<body>

<h1>Detalle del Producto</h1>

<p><strong>Nombre:</strong> {{ $product->name }}</p>
<p><strong>Descripción:</strong> {{ $product->description }}</p>
<p><strong>Precio:</strong> {{ $product->unit_price }}</p>
<p><strong>Stock:</strong> {{ $product->stock }}</p>
<p><strong>Categoría:</strong> {{ $product->category_id }}</p>
<p><strong>Usuario:</strong> {{ $product->updated_by }}</p>

@if($product->image_url)
    <img src="{{ $product->image_url }}" width="150">
@endif

<br><br>
<a href="/products">Volver</a>

</body>
</html>
