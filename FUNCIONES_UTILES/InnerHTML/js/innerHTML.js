/**
 * GeneradorTablas esta clase es un utilitario
 */
class GeneradorTablas {

    constructor() {
        console.log("GeneradorTablas initialized");
    }

    generadorTabla(productos) {
        let html = `<table class="tabla-productos">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>`;
        for (let producto of productos) {
            html += `<tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio.toFixed(2)}</td>
                        <td>${producto.stock}</td>
                        <td>
                            <button onclick="alert('Producto ${producto.nombre} seleccionado')">Editar</button>
                            <button onclick="alert('Producto ${producto.nombre} eliminado')">Eliminar</button>
                        </td>
                    </tr>`;
        }

        html += `</tbody>
                </table>`;
        // Insertar el HTML generado en el elemento con id "tabla-productos"
        document.getElementById("tabla-productos").innerHTML = html;
    }

    limpiarTabla() {
        // Limpiar el contenido del elemento con id "tabla-productos"
        document.getElementById("tabla-productos").innerHTML = "";
    }
}

let productos = [
    { id: 1, nombre: "Laptop", precio: 12000.99, stock: 5 },
    { id: 2, nombre: "Mouse", precio: 500.50, stock: 10 }, 
    { id: 3, nombre: "Teclado", precio: 800.75, stock: 8 },
    { id: 4, nombre: "Monitor", precio: 3000.00, stock: 2 },
    { id: 5, nombre: "Impresora", precio: 1500.25, stock: 3 }
];

const generadorTablas = new GeneradorTablas();

function generarTabla() {
    generadorTablas.generadorTabla(productos);
}

function limpiarTabla() {
    generadorTablas.limpiarTabla();
}

function agregarProductoAleatorio(){
    const nomberProductosAleatorios = ["Tablet", "Smartphone", "Auriculares", "Cámara", "Proyector"];
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nomberProductosAleatorios[Math.floor(Math.random() * nomberProductosAleatorios.length)],
        precio: parseFloat((Math.random() * 10000).toFixed(2)),
        stock: Math.floor(Math.random() * 20) + 1
    };
    productos.push(nuevoProducto);
    generadorTablas.generadorTabla(productos);
}

