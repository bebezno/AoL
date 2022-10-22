# AoL (Aemet over Leaflet) <img src="https://user-images.githubusercontent.com/91427246/197046316-dd3fac5c-ffb9-47cc-b8d8-ecb06f2d0e42.png" width="32" height="32">


AoL es una implementación del radar de la Aemet (Agencia Estatal de Meteorología de España) sobre OpenStreeMaps usando la librería de código libre Leaflet.

### Tamaño :straight_ruler:

Solo 28K.

### Requisitos 📋

Obtención de API Key en [Opendata Aemet](https://opendata.aemet.es/centrodedescargas/inicio).
No existen dependencias de otras fuentes más allá de HTML5.

### Instalación 🔧

1. Descargar y descomprimir  
2. Obtener API Key de [Opendata Aemet](https://opendata.aemet.es/centrodedescargas/inicio)  
3. Sustituir en [maps.js](js/maps.js) API Key y crossOrigin
    
    * function loadAemet() {  ...
	    var AK = "" // API Key obtenida en Opendata Aemet

    * public.loadPicture = function (imageUrl) { ...
      imageObj.crossOrigin = "" // URL que va a originar la petición de datos

## Demo ⚙️

[aol.orbisnonsufficit.es](https://aol.orbisnonsufficit.es/)

<img src="https://user-images.githubusercontent.com/91427246/197034915-ce122497-bea6-48b2-9e65-2d8af3a73e91.png" width="635" height="430">

## Desarrollado con 🛠️

* [Visual Studio Code](https://code.visualstudio.com/)

## Autor ✒️

* **Juan José López Seoane** - [AoL]

## Fuentes

* @TheRoam - [leafMET]
* Rob Hawkes - [Pixel Manipulation]

## Licencia

Este proyecto es open-source.

## Documentación 📄

* [Opendata Aemet](https://opendata.aemet.es/centrodedescargas/inicio)
* [leafMET](https://github.com/TheRoam/leafMET)
* [Pixel Manipulation](https://code.tutsplus.com/es/tutorials/canvas-from-scratch-pixel-manipulation--net-20573)
