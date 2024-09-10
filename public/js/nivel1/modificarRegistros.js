document.getElementById('id').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault();
        consultarRegistro(); // Llamar a la función de consulta cuando se presione Enter o Tab

        // Cambiar el foco al siguiente campo
        document.getElementById('id-llamada').focus();
    }
});

// Función para consultar un registro por ID
async function consultarRegistro() {
    const id = document.getElementById('id').value;
    if (!id) {
        alert("Debes ingresar un ID para consultar");
        return;
    }
    
    try {
        const response = await fetch(`/api/registronivel1s/${id}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('id-llamada').value = data.id_llamada;
            document.getElementById('nombre-client').value = data.nombreClient;
            document.getElementById('document').value = data.documentoCliente;
            document.getElementById('smnet').value = data.smnet;
            document.getElementById('tipiWeb').value = data.tipiWeb;
            document.getElementById('tecnologia').value = data.tecnologia;
            document.getElementById('tiposervicio').value = data.tiposervicio;
            document.getElementById('naturaleza').value = data.naturaleza;
            document.getElementById('observaciones').value = data.observacionesReporte;
            document.getElementById('celular').value = data.celular;
            document.getElementById('horario_b2b').value = data.horario_b2b;
            document.getElementById('modoback').value = data.modoback;
            document.getElementById('horaFinal').value = data.horaFinal; // Corregido
        } else {
            console.error('Error al obtener el registro:', response.statusText);
        }
    } catch (error) {
        console.error('Error al consultar el registro:', error);
    }
}


// Función para modificar un registro por ID
async function modificarRegistro() {
    const id = document.getElementById('id').value;
    if (!id) {
        alert("Debes ingresar un ID para modificar");
        return;
    }

    const data = {
        id_llamada: document.getElementById('id-llamada').value,
        nombreClient: document.getElementById('nombre-client').value,
        documentoCliente: document.getElementById('document').value,
        smnet: document.getElementById('smnet').value,
        tipiWeb: document.getElementById('tipiWeb').value,
        tecnologia: document.getElementById('tecnologia').value,
        tiposervicio: document.getElementById('tiposervicio').value,
        naturaleza: document.getElementById('naturaleza').value,
        observacionesReporte: document.getElementById('observaciones').value,
        celular: document.getElementById('celular').value,
        horario_b2b: document.getElementById('horario_b2b').value,
        modoback: document.getElementById('modoback').value,
        horaFinal: document.getElementById('horaFinal').value // Asegúrate de incluir este campo
    };

    try {
        const response = await fetch(`/api/registronivel1s/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Registro modificado correctamente');
        } else {
            console.error('Error al modificar el registro:', response.statusText);
        }
    } catch (error) {
        console.error('Error al modificar el registro:', error);
    }
}



// Función para eliminar un registro por ID
async function eliminarRegistro() {
    const id = document.getElementById('id').value;
    if (!id) {
        alert("Debes ingresar un ID para eliminar");
        return;
    }

    try {
        const response = await fetch(`/api/registronivel1s/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Registro eliminado correctamente');
        } else {
            console.error('Error al eliminar el registro:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
    }
}

// Asignar eventos a los botones
document.getElementById('consultar').addEventListener('click', consultarRegistro);
document.getElementById('modificar').addEventListener('click', modificarRegistro);
document.getElementById('eliminar').addEventListener('click', eliminarRegistro);
