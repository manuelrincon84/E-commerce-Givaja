<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
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
