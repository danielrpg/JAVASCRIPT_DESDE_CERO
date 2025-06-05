// optener los campos / elementos a trabajar
const formulario = document.getElementById("miFormulario");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");

function validarNombre(nombre) {
    const nuevoNombre = nombre.trim(); // eliminar espacios al inicio y al final

    const errorMensaje = document.getElementById("error-nombre");
    if (nuevoNombre === "") {
        errorMensaje.textContent = "El nombre no puede estar vacío.";
        return false;
    } else if (nuevoNombre.length < 3) {
        errorMensaje.textContent = "El nombre debe tener al menos 3 caracteres.";
        return false;
    } else {
        errorMensaje.textContent = ""; // limpiar mensaje de error
        return true;
    }
}

function validarEmail(email) {
    const nuevoEmail = email.trim(); // eliminar espacios al inicio y al final
    const errorMensaje = document.getElementById("error-email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // expresión regular para validar el formato del email
    if (nuevoEmail === "") {
        errorMensaje.textContent = "El email no puede estar vacío.";
        return false;
    } else if (!emailRegex.test(nuevoEmail)) {
        errorMensaje.textContent = "El email no es válido.";
        return false;
    } else {
        errorMensaje.textContent = ""; // limpiar mensaje de error
        return true;
    }
}

function validarTelefono(telefono) {
    const nuevoTelefono = telefono.trim(); // eliminar espacios al inicio y al final
    const errorMensaje = document.getElementById("error-telefono");
    const telefonoRegex = /^\d{10}$/; // expresión regular para validar un número de teléfono de 10 dígitos
    if (nuevoTelefono === "") {
        errorMensaje.textContent = "El teléfono no puede estar vacío.";
        return false;
    } else if (!telefonoRegex.test(nuevoTelefono)) {
        errorMensaje.textContent = "El teléfono debe tener 10 dígitos.";
        return false;
    } else {
        errorMensaje.textContent = ""; // limpiar mensaje de error
        return true;
    }
}


// validar el formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // prevenir el envio del formulario
    
    const nombreValido = validarNombre(nombre.value);
    const emailValido = validarEmail(email.value);
    const telefonoValido = validarTelefono(telefono.value);

    if (nombreValido && emailValido && telefonoValido) {
        document.getElementById("mensaje-exito").style.display = "block"; // mostrar mensaje de éxito
        setTimeout(() => {
            document.getElementById("mensaje-exito").style.display = "none"; // ocultar mensaje de éxito después de 3 segundos
            formulario.reset(); // limpiar el formulario
        }, 2000); // ocultar mensaje de éxito después de 2 segundos
    } else {
        document.getElementById("mensaje-exito").style.display = "block"; // mostrar mensaje de error
        document.getElementById("mensaje-exito").textContent = "Por favor, corrige los errores en el formulario.";
        document.getElementById("mensaje-exito").style.color = "red"; // cambiar color del mensaje de error
    }
});
