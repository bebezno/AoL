
let map = null

loadAemet()

function loadMap(aemet) {

	var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	})


	// Centro en Madrid
	map = L.map('map', {
		center: [40.4381311, -3.8196201],
		zoom: 6,
		layers: [tiles, aemet]
	})

	// Mapas base, se pueden ampliar con otras fuentes
	var baseMaps = {
		"OpenStreetMap": tiles,
	}

	// Capa con la imagen de la Aemet
	var overlayMaps = {
		"Aemet": aemet,
	}

	L.control.layers(baseMaps, overlayMaps).addTo(map)
}

function loadAemet() {
	// API Key obtenida en Opendata Aemet
	var AK = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuam8ubC5zZW9hbmVAZ21haWwuY29tIiwianRpIjoiZDE3M2QzZGYtNGUxMC00NDdkLThmNTYtMTBiMTc5YjNlY2U5IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NDk0MjI5NTYsInVzZXJJZCI6ImQxNzNkM2RmLTRlMTAtNDQ3ZC04ZjU2LTEwYjE3OWIzZWNlOSIsInJvbGUiOiIifQ.vf8BhVgGFF82flCWcoZ0tyP8yRQ7uXnGNC9k1Yc6ng0" 
	// Define URLs de OpenData Aemet
	var URL1 = "https://opendata.aemet.es/opendata/api/red/radar/nacional"

	var URL2 = ""

	// XMLHttpRequest
	const xhttp1 = new XMLHttpRequest()

	// Primer Request
	// Devuelve un objeto con formato JSON. El parámetro "datos" contiene la URL de la imagen del radar
	xhttp1.onload = function () {
		// Parse a JSON:
		URL2 = JSON.parse(this.responseText)
		// Obtiene el campo "datos"
		var imageUrl = URL2.datos
		app.loadPicture(imageUrl)

	}

	// Send Request
	xhttp1.open("GET", URL1 + "/?api_key=" + AK)
	xhttp1.send()
}

// Aemet app.loadPicture
var app = (function () {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),

		// API
		public = {}

	public.loadPicture = function (imageUrl) {
		var imageObj = new Image()
		imageObj.src = imageUrl
		// URL que va a originar la petición de datos
		imageObj.crossOrigin = "https://aol.orbisnonsufficit.es/"

		imageObj.onload = function () {
			context.drawImage(imageObj, 0, 0, canvas.width, canvas.height)
			app.filters.opacity()
		}
	}

	public.getImgData = function () {
		return context.getImageData(0, 0, canvas.width, canvas.height)
	}

	// Filters
	public.filters = {}

	// Filtro para aplicar transparencia
	public.filters.opacity = function () {
		var imageData = app.getImgData(),
			pixels = imageData.data,
			numPixels = imageData.width * imageData.height

		for (var i = 0; i < numPixels; i++) {
			var r = pixels[i * 4]
			var g = pixels[i * 4 + 1]
			var b = pixels[i * 4 + 2]

			if (r == 127 // gris
				|| (r == 0 && g == 0 && b == 0) // negro
				|| (i <= 34200) // primera filas con logo de Aemet
				|| (i >= 543400) // últimas filas con leyenda
				|| (r == 255 && g == 0 && b == 255)) { // contorno rosado del mapa
				pixels[i * 4] = 255 // rgb a blanco
				pixels[i * 4 + 1] = 255 // rgb a blanco
				pixels[i * 4 + 2] = 255 // rgb a blanco
				pixels[i * 4 + 3] = 0 // opacidad 0 para convertirlo en transparente
			}
		}

		context.putImageData(imageData, 0, 0)
		var aemetPng = canvas.toDataURL('image/png')

		// Marco donde se ubicará la imagen
		latLngBounds = [
			[46.4, -2.0], // límite NORTE
			[41.0, -12.0], // límite OESTE
			[32.9, 0.0], // límite SUR
			[40.419623569820125, 5.859104861536971]] // límite ESTE

		var imageOverlay = L.imageOverlay(aemetPng, latLngBounds, {
			opacity: 1,
			alt: 'Radar de la Aemet',
			interactive: true,
		})

		aemet = L.layerGroup([imageOverlay])
		loadMap(aemet)
	}

	return public
}())