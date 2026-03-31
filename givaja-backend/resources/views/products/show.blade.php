<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle del Producto</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/products.css') }}">

</head>
<body style="background-color: #f2f2f2; color: #333;">
    <div class="container-fluid px-5 py-5">
        <div class="card shadow p-4" style="border-radius: 20px; border: 2px solid #6fcf97; background-color: #e9e9e9;">

            <h2 class="text-center mb-4">Detalle del Producto</h2>

            <div class="row mb-4">
                <!-- Imagen a la izquierda -->
                <div class="col-md-5">
                    <div class="text-center">
                        @if($product->image_url)
                            <img src="{{ $product->image_url }}" class="img-fluid" style="max-width: 100%; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        @else
                            <div style="background-color: #ddd; height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                                <span class="text-muted">Sin imagen</span>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Texto a la derecha -->
                <div class="col-md-7">
                    <div class="mb-3">
                        <p class="mb-2"><strong style="color: #6fcf97;">Nombre:</strong></p>
                        <p class="ms-2">{{ $product->name }}</p>
                    </div>

                    <div class="mb-3">
                        <p class="mb-2"><strong style="color: #6fcf97;">Descripción:</strong></p>
                        <p class="ms-2">{{ $product->description }}</p>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <p class="mb-2"><strong style="color: #6fcf97;">Precio:</strong></p>
                                <p class="ms-2">${{ number_format($product->unit_price, 2) }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <p class="mb-2"><strong style="color: #6fcf97;">Stock:</strong></p>
                                <p class="ms-2">
                                    <span class="badge {{ $product->stock > 0 ? 'badge-green' : 'badge-red' }}">
                                        {{ $product->stock }} unidades
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <p class="mb-2"><strong style="color: #6fcf97;">Categoría:</strong></p>
                        <p class="ms-2">{{ $product->category->name ?? 'Sin categoría' }}</p>
                    </div>

                    <div class="mb-4">
                        <p class="mb-2"><strong style="color: #6fcf97;">Última actualización por:</strong></p>
                        <p class="ms-2">{{ $product->updatedByUser->name ?? 'Sin usuario' }}</p>
                    </div>
                </div>
            </div>

            <div class="d-flex gap-2">
                <a href="{{ route('products.edit', $product) }}" class="btn w-50" style="background-color: #6fcf97; color: white; border-radius: 10px;">
                    Editar
                </a>
                <a href="/products" class="btn w-50" style="border: 2px solid #6fcf97; color: #6fcf97; border-radius: 10px; background-color: transparent;">
                    Volver
                </a>
            </div>

        </div>
    </div>

</body>
</html>
