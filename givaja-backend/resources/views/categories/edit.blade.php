<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Categoría - Givaja</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/products.css') }}">
</head>
<body style="background-color: #f2f2f2; color: #333;">
    <nav class="navbar navbar-expand-lg" style="background-color: #6fcf97; font-size: medium;">
        <div class="container-fluid">
            <a class="navbar-brand" href="/" style="color: white !important; font-weight: bold;">Givaja</a>
        </div>
    </nav>

    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="card shadow p-4" style="width: 840px; border-radius: 20px; border: 2px solid #6fcf97; background-color: #e9e9e9;">
            <h3 class="text-center mb-4">Editar Categoría</h3>

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('categories.update', $category) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="name" class="form-label">Nombre <span style="color: #6fcf97;">*</span></label>
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $category->name) }}" required>
                    @error('name')<span class="invalid-feedback">{{ $message }}</span>@enderror
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Descripción</label>
                    <textarea class="form-control @error('description') is-invalid @enderror" id="description" name="description" rows="4">{{ old('description', $category->description) }}</textarea>
                    @error('description')<span class="invalid-feedback">{{ $message }}</span>@enderror
                </div>

                <div class="d-flex gap-2 mt-4">
                    <button type="submit" class="btn" style="background-color: #6fcf97; color: white; border-radius: 10px; padding: 10px 20px;">Actualizar</button>
                    <a href="{{ route('categories.index') }}" class="btn" style="border: 2px solid #6fcf97; color: #6fcf97; border-radius: 10px; padding: 10px 20px; background-color: transparent;">Cancelar</a>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
