

let usuarios = [];


function registrarUsuario() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var edad = document.getElementById("edad").value;

    if (nombre && email && edad) {
        alert("Usuario registrado exitosamente!");
        const fechaActual = new Date();
        console.log("Fecha y hora de registro:", fechaActual.toLocaleString());
        usuarios.push({
            nombre: nombre,
            email: email,
            edad: edad,
            fechaRegistro: fechaActual.toLocaleString()
        });
        
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function mostrarUsuariosRegistrados() { 

}

function actualizarFechaHora() {
    const fechaHoraActual = new Date();
    const fechaHoraFormateada = fechaHoraActual.toLocaleString();
    const hora = fechaHoraActual.toLocaleTimeString();
    document.getElementById("fecha-hora").innerText = `Fecha y Hora Actual: ${fechaHoraFormateada}`;
}

function init() {
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000); // Actualiza cada segundo
}

window.addEventListener("DOMContentLoaded", init());