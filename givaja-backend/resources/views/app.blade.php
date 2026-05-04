<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Givaja</title>

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead

</head>

<body style="background-color: #f2f2f2; color: #333;">
    @inertia
</body>
</html>
