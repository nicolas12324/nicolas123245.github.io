const celdas = document.querySelectorAll('.celda');
const mensajeElemento = document.getElementById('mensaje');
const reiniciarBoton = document.getElementById('reiniciar');

let tablero = ['', '', '', '', '', '', '', '', ''];
let jugadorActual = 'X';
let juegoActivo = true;

const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

function manejarClickCelda(evento) {
    const celdaClickeada = evento.target;
    const indiceCelda = parseInt(celdaClickeada.dataset.index);

    if (tablero[indiceCelda] === '' && juegoActivo) {
        tablero[indiceCelda] = jugadorActual;
        celdaClickeada.textContent = jugadorActual;
        verificarGanador();
        cambiarJugador();
    }
}

function cambiarJugador() {
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    mensajeElemento.textContent = `Turno de ${jugadorActual}`;
}

function verificarGanador() {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const [a, b, c] = combinacionesGanadoras[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            mensajeElemento.textContent = `¡Jugador ${tablero[a]} ha ganado!`;
            juegoActivo = false;
            return;
        }
    }

    if (!tablero.includes('')) {
        mensajeElemento.textContent = '¡Empate!';
        juegoActivo = false;
    }
}

function reiniciarJuego() {
    tablero = ['', '', '', '', '', '', '', '', ''];
    jugadorActual = 'X';
    juegoActivo = true;
    mensajeElemento.textContent = `Turno de ${jugadorActual}`;
    celdas.forEach(celda => {
        celda.textContent = '';
    });
}

celdas.forEach(celda => {
    celda.addEventListener('click', manejarClickCelda);
});

reiniciarBoton.addEventListener('click', reiniciarJuego);

// Mensaje inicial
mensajeElemento.textContent = `Turno de ${jugadorActual}`;