let now = new Date()
document.getElementById('mapupdate').innerHTML = `${now.toLocaleString()} <p id="clock"></p>`

var inicialTime = 300 // actualiza cada 5 minutos
var actualTime = inicialTime

function Clock() {

    if (actualTime == 0) {
        document.location.reload()
        actualTime = inicialTime
    } else {
        actualTime -= 1
        setTimeout("Clock()", 1000) // 1 seg
    }
    var minutos = Math.floor(actualTime/60) + 1
    document.getElementById('clock').innerHTML = `${minutos} min. para actualización`
}

Clock()