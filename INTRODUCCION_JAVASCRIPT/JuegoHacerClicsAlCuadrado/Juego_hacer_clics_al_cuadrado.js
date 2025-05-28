/**
 * Juego: Hacer clics al cuadrado
 * Este juego consiste en hacer clic en un cuadrado que cambia de color y tamaño    
 * cada vez que se hace clic en él.
 */
// Obtenemos referencia a los elementos HTML
const cuadrado = document.getElementById('cuadrado');
const contadorClics = document.getElementById('clicks');
const botonReiniciar = document.getElementById('reiniciar');

// Inicializamos la variable para contar clics
let numClics = 0;

// Lista de colores para cambiar
const colores = ['red', 'green', 'purple', 'orange', 'pink', 'yellow'];

// Añadimos evento de clic al cuadrado
cuadrado.addEventListener('click', function () {
    // Incrementamos el contador
    numClics++;

    // Actualizamos el texto
    contadorClics.textContent = 'Número de clics: ' + numClics;

    // Cambiamos el color del cuadrado
    const colorAleatorio = colores[numClics % colores.length];
    cuadrado.style.backgroundColor = colorAleatorio;

    // Cambiamos el tamaño
    const nuevoTamano = 100 + (numClics * 10);
    if (nuevoTamano <= 200) {  // Limitamos el tamaño máximo
        cuadrado.style.width = nuevoTamano + 'px';
        cuadrado.style.height = nuevoTamano + 'px';
    }
});

// Añadimos evento para reiniciar
botonReiniciar.addEventListener('click', function () {
    numClics = 0;
    contadorClics.textContent = 'Número de clics: 0';
    cuadrado.style.backgroundColor = 'blue';
    cuadrado.style.width = '100px';
    cuadrado.style.height = '100px';
});