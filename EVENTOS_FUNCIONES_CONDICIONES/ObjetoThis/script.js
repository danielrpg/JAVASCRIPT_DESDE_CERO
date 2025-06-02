// Ejemplo 1
function ejemplo1() {
    const persona = {
        nombre: "María",
        edad: 25,
        presentarse: function () {
            return "Hola, soy " + this.nombre + " y tengo " + this.edad + " años";
        }
    };

    const resultado = persona.presentarse();
    document.getElementById('output1').style.display = 'block';
    document.getElementById('output1').innerHTML = '📤 Resultado: ' + resultado;
}

// Ejemplo 2
function ejemplo2() {
    const persona = {
        nombre: "Carlos",
        saludar: function () {
            return "Hola, soy " + (this.nombre || "undefined");
        }
    };

    // Dentro del objeto
    const resultado1 = persona.saludar();

    // Fuera del objeto
    const funcionSuelta = persona.saludar;
    const resultado2 = funcionSuelta();

    document.getElementById('output2').style.display = 'block';
    document.getElementById('output2').innerHTML =
        '✅ Dentro del objeto: ' + resultado1 + '<br>' +
        '❌ Función suelta: ' + resultado2;
}

// Ejemplo 3
function ejemplo3() {
    const coche = {
        marca: "Toyota",
        modelo: "Corolla",
        describir: function () {
            return "Este es un " + (this.marca || "undefined") + " " + (this.modelo || "undefined");
        }
    };

    // Sin bind
    const desc1 = coche.describir;
    const resultado1 = desc1();

    // Con bind
    const desc2 = coche.describir.bind(coche);
    const resultado2 = desc2();

    document.getElementById('output3').style.display = 'block';
    document.getElementById('output3').innerHTML =
        '❌ Sin bind: ' + resultado1 + '<br>' +
        '✅ Con bind: ' + resultado2;
}

// Ejemplo 4a - Función normal
function ejemplo4a() {
    const equipo = {
        nombre: "Los Tigres",
        jugadores: ["Ana", "Luis", "Pedro"],
        mostrarJugadores: function () {
            let resultado = "Equipo: " + this.nombre + "<br>";
            this.jugadores.forEach(function (jugador) {
                resultado += jugador + " del equipo " + (this.nombre || "undefined") + "<br>";
            });
            return resultado;
        }
    };

    document.getElementById('output4').style.display = 'block';
    document.getElementById('output4').innerHTML = '🚫 Función Normal:<br>' + equipo.mostrarJugadores();
}

// Ejemplo 4b - Arrow function
function ejemplo4b() {
    const equipo = {
        nombre: "Los Tigres",
        jugadores: ["Ana", "Luis", "Pedro"],
        mostrarJugadores: function () {
            let resultado = "Equipo: " + this.nombre + "<br>";
            this.jugadores.forEach((jugador) => {
                resultado += jugador + " del equipo " + this.nombre + "<br>";
            });
            return resultado;
        }
    };

    document.getElementById('output4').style.display = 'block';
    document.getElementById('output4').innerHTML = '✅ Arrow Function:<br>' + equipo.mostrarJugadores();
}

// Contador interactivo
const contador = {
    valor: 0,
    incrementar: function () {
        this.valor++;
        return this.valor;
    },
    resetear: function () {
        this.valor = 0;
        return this.valor;
    }
};

function incrementarContador() {
    const nuevoValor = contador.incrementar();
    document.getElementById('contadorValor').textContent = nuevoValor;
}

function resetearContador() {
    const nuevoValor = contador.resetear();
    document.getElementById('contadorValor').textContent = nuevoValor;
}