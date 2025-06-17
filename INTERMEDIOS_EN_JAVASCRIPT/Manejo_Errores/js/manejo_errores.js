function mostrarMensaje(resultado, divId, color) {
    document.getElementById(divId).innerText = "Resultado: " + resultado;
    document.getElementById(divId).style.display = "block";
    document.getElementById(divId).style.color = color;
}


function dividirSeguro() {

    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let resultado;

    try {

        if (!num1 || !num2) {
            throw new Error("Ambos campos deben ser llenados.");
        }

        const numero1 = parseFloat(num1);
        const numero2 = parseFloat(num2);

        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error("Los valores ingresados deben ser números.");
        }

        if (num2 == 0) {
            throw new Error("El denominador no puede ser cero.");
        }
        resultado = numero1 / numero2;
        mostrarMensaje(resultado, "resultado-calc", "green");
    } catch (error) {
        mostrarMensaje("Error: " + error.message, "resultado-calc", "red");
    } finally {
        console.log("Operación de división finalizada.");
    }
}

function validarEmail() {
    const email = document.getElementById("email").value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        if (!email) {
            throw new Error("Por favor ingresa el email.");
        }

        if (!email.includes("@")) {
            throw new Error("El email debe contener un '@'.");
        }

        if (!regex.test(email)) {
            throw new Error("El formato del correo electrónico es inválido.");
        }

        if (email.length < 5 || email.length > 50) { 
            throw new Error("El correo electrónico debe tener entre 5 y 50 caracteres.");
        }

        mostrarMensaje("Correo electrónico válido.", "resultado-email", "green");
    } catch (error) {
        mostrarMensaje("Error: " + error.message, "resultado-email", "red");
    }
}

function convertirJSON() {
    const textoJson = document.getElementById("json-texto").value;

    try {
        if (!textoJson) {
            throw new Error("El campo de texto no puede estar vacío.");
        }

        const objeto = JSON.parse(textoJson);

        if (typeof objeto !== 'object' || objeto === null) {
            throw new Error("El texto ingresado no es un JSON válido.");
        }

        const propiedades = Object.keys(objeto).length;

        if (propiedades === 0) {
            throw new Error("El JSON no debe estar vacío.");
        }
        mostrarMensaje("JSON convertido a objeto: " + JSON.stringify(objeto), "resultado-json", "green");
    } catch (error) {
        if (error instanceof SyntaxError) {
            mostrarMensaje("Error de sintaxis: " + error.message, "resultado-json", "red");
        } else if (error instanceof TypeError) {
            mostrarMensaje("Error de tipo: " + error.message, "resultado-json", "red");
        } else {
            mostrarMensaje("Error: " + error.message, "resultado-json", "red");
        }
    } finally {
        console.log("Conversión de JSON finalizada.");
    }
}

function obtenerUsuario() {
    const userId = document.getElementById("user-id").value;

    try {
        if (!userId) {
            throw new Error("El ID de usuario no puede estar vacío.");
        }

        const id = parseInt(userId);

        if (isNaN(id) || id < 1) {
            throw new Error("El ID de usuario debe ser un número positivo.");
        }

        if (id > 10) { 
            throw new Error("El ID de usuario debe ser menor o igual a 10.");
        }

        const usuario  = sumularAPI(id).then(usuario => {
            mostrarMensaje("Usuario obtenido: " + JSON.stringify(usuario), "resultado-api", "green");
        }).catch(error => {
            mostrarMensaje("Error: " + error.message, "resultado-api", "red");
        });

        console.log(usuario);
    } catch (error) {
        mostrarMensaje("Error: " + error.message, "resultado-api", "red");
    }
}

// servicio simulado para obtener datos de usuario
function sumularAPI(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const success = Math.random() > 0.3; // Simula un 30% de éxito
                if (success < 0.3) {
                    throw new Error("Error de conxion con el servidor.");
                }

                const idUseuario = parseInt(id);

                if (isNaN(idUseuario) || idUseuario < 1 || idUseuario > 10) {
                    reject(new Error("ID de usuario inválido."));
                }

                mostrarMensaje("Simulando la obtención de datos del usuario con ID: " + idUseuario, "resultado-api", "blue");
                resolve({
                    id: idUseuario,
                    nombre: "Usuario " + idUseuario,
                    email: "usuario" + idUseuario + "@ejemplo.com"
                });
            } catch (error) {
                reject(new Error("Error al obtener los datos de la API."));
            }
        }, 2000); // Simula un retraso de 2 segundos
    });
}