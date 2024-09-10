// Función para cargar todos los registros desde el backend y mostrarlos en la tabla
async function cargarRegistros() {
    try {
        const response = await fetch('/api/registronivel1s');
        if (response.ok) {
            const registronivel1s = await response.json();
            const tbody = document.querySelector('#registrosTable tbody');
            tbody.innerHTML = ''; // Limpiar la tabla antes de agregar las filas

            registronivel1s.forEach(registro => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${registro.id}</td>
                    <td>${registro.id_llamada}</td>
                    <td>${registro.nombreClient}</td>
                    <td>${registro.documentoCliente}</td>
                    <td>${registro.smnet}</td>
                    <td>${registro.tipiWeb}</td>
                    <td>${registro.modoback}</td>
                    <td>${registro.tecnologia}</td>
                    <td>${registro.tiposervicio}</td>
                    <td>${registro.naturaleza}</td>
                    <td>${registro.observacionesReporte}</td>
                    <td>${registro.celular}</td>
                    <td>${registro.horario_b2b}</td>
                    <td>${registro.horaFinal}</td>
                    <td>
                        <button onclick="modificarRegistro('${registro.id}')">Modificar</button>
                        <button onclick="eliminarRegistro('${registro.id}')">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        } else {
            console.error('Error al obtener los registros:', response.statusText);
        }
    } catch (error) {
        console.error('Error al cargar los registros:', error);
    }
}

// Función para modificar un registro (redirecciona a la página de modificación)
function modificarRegistro(id) {
    window.location.href = `nivel1Modificar.html?id=${id}`;
    document.getElementById('id').focus();
}

// Función para eliminar un registro
async function eliminarRegistro(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        try {
            const response = await fetch(`/api/registronivel1s/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Registro eliminado correctamente');
                cargarRegistros(); // Recargar la tabla
            } else {
                console.error('Error al eliminar el registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    }
}

// Cargar los registros al cargar la página
document.addEventListener('DOMContentLoaded', cargarRegistros);
