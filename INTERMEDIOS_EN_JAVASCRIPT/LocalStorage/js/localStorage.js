
function guardarNombre() {
    try {
        const nombre = document.getElementById("mi-nombre").value;

        if (!nombre) {
            throw new Error("El nombre no puede estar vacío.");
        }

        localStorage.setItem("nombre", nombre);
        alert("Nombre guardado correctamente: " + nombre);
    } catch (error) {
        console.error("Error al guardar el nombre:", error.message);
        alert("Error al guardar el nombre: " + error.message);
    }
}

mostrarNombre = () => {
    try {
        const nombreGuardado = localStorage.getItem("nombre");

        if (!nombreGuardado) {
            throw new Error("No hay un nombre guardado en LocalStorage.");
        }

        document.getElementById("resultado-nombre").innerText = "Nombre guardado: " + nombreGuardado;
    } catch (error) {
        console.error("Error al mostrar el nombre:", error.message);
        alert("Error al mostrar el nombre: " + error.message);
    }
}

