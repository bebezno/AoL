
// let map = null
let marco = null
let aemet = []
let aemetIberia = [null]
let aemetCanarias = null
let urlIberia = 'https://opendata.aemet.es/opendata/api/red/radar/nacional'
let urlCanarias = 'https://opendata.aemet.es/opendata/api/red/radar/regional/ca'
// Marco donde se ubicará la imagen 760 * 760 px, límites [[NORTE, OESTE], [SUR, OESTE], [SUR, ESTE], [NORTE, ESTE]]
let marcoIberia = [[46.4, -12.0],[32.9, -12.0],[32.9, 5.86],[46.4, 5.86]]
// Marco donde se ubicará la imagen 480 * 530 px
let marcoCanarias = [[30.0, -18.1],[25.2, -18.1],[25.2, -13.4],[30.0, -13.4]]

loadAemet(0, urlIberia, marcoIberia)

function loadMap(aemet) {

	var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	})

	// Centro en Madrid
	map = L.map('map', {
		center: [40.4379543,-3.6795367],
		zoom: 6,
		layers: [tiles, aemet[0], aemet[1]]
	})

	// Mapas base, se pueden ampliar con otras fuentes
	var baseMaps = {
		"OpenStreetMap": tiles,
	}

	// Capa con la imagen de la Aemet
	var overlayMaps = {
		"Iberia": aemet[0],
		"Canarias": aemet[1],
	}

	L.control.layers(baseMaps, overlayMaps).addTo(map)
}

function loadAemet(index, url1, marco) {
	// API Key obtenida en Opendata Aemet
	var AK = ""
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
		app.loadPicture(index, imageUrl, marco)
	}

	// Send Request
	xhttp1.open("GET", url1 + "/?api_key=" + AK)
	xhttp1.send()
}

// Aemet app.loadPicture
var app = (function () {
	let index = null
	let marco = null
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d', { willReadFrequently: true }),

		// API
		public = {}

	public.loadPicture = function (indexlocal, imageUrl, marcoLocal) {
		marco = marcoLocal
		index = indexlocal
		var imageObj = new Image()
		imageObj.src = imageUrl
		// URL que va a originar la petición de datos
		imageObj.crossOrigin = ""

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

		function transparencia() {
			for (var i = 0; i < numPixels; i++) {
				var r = pixels[i * 4]; var g = pixels[i * 4 + 1];var b = pixels[i * 4 + 2];
	
				if (
					(i <= 34200) // primera 45 filas (* 760 px) con logo de Aemet
					|| (i >= 543400) // últimas 715 filas (* 760 px) con leyenda
					|| (r == 255 && g == 0 && b == 255) // contorno rosado del mapa
					|| (r == g && g == b) // grises
					|| b == 0 // negro, amarillo
					) {
					// RGB a blanco
					pixels[i * 4] = 255
					pixels[i * 4 + 1] = 255
					pixels[i * 4 + 2] = 255
					// opacidad 0 para convertirlo en transparente
					pixels[i * 4 + 3] = 0
				}
			}
		}

		transparencia()
		context.putImageData(imageData, 0, 0)
		var aemetPng = canvas.toDataURL('image/png')

		var imageOverlay = L.imageOverlay(aemetPng, marco, {
			opacity: 1,
			alt: 'Radar de la Aemet',
			interactive: true,
		})

		aemet[index] = L.layerGroup([imageOverlay])

		switch (aemet.length) {
			case 1:
				loadAemet(1, urlCanarias, marcoCanarias)
				break;
			case 2:
				loadMap(aemet)
				break;
			default:
				break;
		}

	}

	return public
}())
