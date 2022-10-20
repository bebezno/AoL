var inicialTime = 300; // actualiza cada 5 minutos
var actualTime = inicialTime;

function Clock() {

    if (actualTime == 0) {
        document.location.reload();
        actualTime = inicialTime;
    } else {
        actualTime -= 1;
        setTimeout("Clock()", 1000); // 1 seg
    }
    var minutos = Math.floor(actualTime/60) + 1;
    document.getElementById('Clock').innerHTML = minutos
        + " min. para actualización";
}

Clock();