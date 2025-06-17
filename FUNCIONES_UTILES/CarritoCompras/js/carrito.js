const products = [
    {
        "id": 1,
        "name": "Mouse",
        "precio": 25.00,
        "imagen": "https://resource.logitech.com/w_776,h_437,ar_16:9,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m100/m100-charcoal-feature-2.jpg",
    },
    {
        "id": 2,
        "name": "Teclado",
        "precio": 35.00,
        "imagen": "https://sofmat.com.bo/wp-content/uploads/2024/06/Teclado-USB-Havit.jpg",
    },
    {
        "id": 3,
        "name": "Monitor", 
        "precio": 150.00,
        "imagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MonitorLCDlcd.svg/1200px-MonitorLCDlcd.svg.png",
    },
    {
        "id": 4,
        "name": "Laptop",
        "precio": 800.00,
        "imagen": "https://i5.walmartimages.com/seo/Lenovo-Ideapad-5-14-1080p-Touchscreen-Laptop-AMD-Ryzen-7-5700U-8GB-RAM-512GB-SSD-Windows-11Home-Graphite-Grey-82LM00UEUS_bd7e44d5-ecc2-492a-9fe7-56c8599372bd.31d4c74bec047ea8f7dd7939c4e7801b.jpeg",
    },
    {
        "id": 5,
        "name": "Impresora",
        "precio": 120.00,
        "imagen": "https://mediaserver.goepson.com/ImConvServlet/imconv/4169c9471e1e9ade74acf9c5d49e5a99991eb237/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=L5590-690x460-1",
    }
];

let carrito = [];

function agregarAlCarrito(id) {
    const producto = products.find(p => p.id === id);
    
    const posicionProducto = carrito.findIndex(p => p.id === id);
    if (posicionProducto !== -1) {
        //carrito[posicionProducto].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            name: producto.name,
            precio: producto.precio,
        });
    }
    mostrarCarrito();
}

function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    products.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button 
                class="agregar-btn"
                onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>
        `;
        contenedor.appendChild(div);
    });
}

function mostrarCarrito() {
    const contenedor = document.getElementById('carrito-items');
    contenedor.innerHTML = ''; // Limpiar el contenido previo

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(producto => {
            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
                <h4>${producto.name}</h4>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button
                    class="eliminar-btn"
                    onclick="eliminarDelCarrito
                    (${producto.id})">
                    Eliminar
                </button>
            `;
            contenedor.appendChild(div);
        });
    }
    mostrarTotal();
}

function mostrarTotal() {
    const total = calcularTotal();
    const contenedorTotal = document.getElementById('total');
    contenedorTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(id) {
    const respuesta = confirm("¿Estás seguro de que deseas eliminar este producto del carrito?");
    if (!respuesta) {
        return; // Si el usuario cancela, no hacemos nada
    }
    //carrito = carrito.filter(producto => producto.id !== id);
    const posicionProducto = carrito.findIndex(p => p.id === id);
    if (posicionProducto !== -1) {
        carrito.splice(posicionProducto, 1);
    }

    mostrarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }

    const respuesta = confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (!respuesta) {
        return; // Si el usuario cancela, no hacemos nada
    }

    carrito = [];
    mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', () => mostrarProductos());