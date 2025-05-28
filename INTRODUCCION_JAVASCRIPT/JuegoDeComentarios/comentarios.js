// Función para mostrar pista adicional
function mostrarPista() {
    document.getElementById("pista").style.display = "block";
}

// Función que ejecuta el código corregido
function ejecutarCodigo() {
    try {
        // Versión corregida del código
        let contador = 0;
        let mensaje = "";

        // El bucle se ejecuta 5 veces, sumando 1 en cada iteración
        for (let i = 0; i < 5; i++) {
            contador++; // Incrementamos el contador
            mensaje += "Contador: " + contador + "<br>";
        }

        // Corregido: Usamos "resultado" en lugar de "resultados"
        document.getElementById("resultado").innerHTML = mensaje;

        // Mensaje de éxito
        document.getElementById("resultado").innerHTML +=
            "<div style='margin-top:10px; color:green; font-weight:bold;'>" +
            "¡Correcto! Has encontrado y corregido el error en el código. " +
            "El problema estaba en el ID del elemento: se usaba 'resultados' en vez de 'resultado'.</div>";
    } catch (error) {
        // Si hay algún error, lo mostramos
        document.getElementById("resultado").innerHTML =
            "<div style='color:red;'>Error: " + error.message +
            "<br>Sigue buscando el error en el código.</div>";
    }
}