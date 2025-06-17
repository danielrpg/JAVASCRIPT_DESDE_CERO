
let gastos = []; // Array para almacenar los gastos

function agregarGasto() {
    // Obtener los valores de los campos de entrada
    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('gasto').value);
    const categoria = document.getElementById('categoria').value;


    if (!categoria) {
        alert('Por favor, selecciona una categoría.');
        return;
    }

    if (isNaN(monto) || monto <= 0) {
        alert('Por favor, ingresa un monto válido.');
        return;
    }

    // console.log(Date.now());
    const nuevoGasto = {
        id: Date.now(), // Generar un ID único basado en la fecha y hora actual
        descripcion: descripcion,
        monto: monto,
        categoria: categoria
    };

    gastos.push(nuevoGasto); // Agregar el nuevo gasto al array

    // console.log(gastos); // Mostrar el array de gastos en la consola

    mostrarGastos(); // Actualizar la lista de gastos

}

function mostrarGastos() {
    const listaGastos = document.getElementById('gastosLista');
    listaGastos.innerHTML = ''; // Limpiar la lista antes de mostrar los gastos

    if (gastos.length === 0) {
        listaGastos.innerHTML = '<p>No hay gastos registrados.</p>';
        return;
    }

    let htmlTable = `
            <table>
                <tr>
                    <th>Descripción</th> 
                    <th>Monto</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
        `;

    for (let i = 0; i <= gastos.length - 1; i++) {
        const gasto = gastos[i];

        let icono = '';
        switch (gasto.categoria) {
            case 'comida':
                icono = '🍔';
                break;
            case 'transporte':
                icono = '🚗';
                break;
            case 'entretenimiento':
                icono = '🎬';
                break;
            case 'hogar':
                icono = '⚡';
                break;
            default:
                icono = '🏥';
        }

        htmlTable += `
            <tr>
                <td>${gasto.descripcion}</td>
                <td>${gasto.monto.toFixed(2)}Bs.-</td>
                <td>${icono} ${gasto.categoria}</td>
                <td>
                    <button onclick="eliminarGasto(${gasto.id})">Eliminar</button>
                </td>
            </tr>
        `; // Agregar el gasto a la lista
    }

    htmlTable += '</table>';
    listaGastos.innerHTML = htmlTable;
    calcularTotal(); // Calcular el total de gastos
}

function calcularTotal() {
    const total = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    // for (let i = 0; i < gastos.length; i++) {
    //     const gasto = gastos[i];
    //     console.log(`Gasto ${i + 1}: ${gasto.descripcion} - Monto: ${gasto.monto.toFixed(2)} Bs.-`);
    // }
    document.getElementById('total-gastos').innerText = `Total Gastos: ${total.toFixed(2)} Bs.-`;
}

function eliminarGasto(id) { 
    // Filtrar el array de gastos para eliminar el gasto con el ID especificado
    gastos = gastos.filter(gasto => gasto.id !== id);
    // for (let i = 0; i < gastos.length; i++) {
    //    if (gastos[i].id === id) {
    //         gastos.splice(i, 1); // Eliminar el gasto del array
    //         break; // Salir del bucle una vez que se ha eliminado el gasto
    //     }
    // }
    
    mostrarGastos(); // Actualizar la lista de gastos después de eliminar
    calcularTotal(); // Recalcular el total de gastos
}