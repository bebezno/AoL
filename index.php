<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/leaflet.png" type="image/x-icon">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
    <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
    <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"></script> -->
    <link rel="stylesheet" href="css/style.css?datetime=<?PHP echo date("U"); ?>">
    <title>Radar de la Aemet sobre OpenStreeMaps (Leaflet) | by Bebezno</title>
</head>

<body>
    <div id="map"></div>
    <div class="mapupdate"><?php echo Date('r'); ?><br><span id="Clock"></span></div>
    <canvas id="canvas" width="760" height="760"></canvas>
    <script src="js/map.js?datetime=<?PHP echo date("U"); ?>"></script>
    <script src="js/clock.js?datetime=<?PHP echo date("U"); ?>"></script>
</body>

</html>