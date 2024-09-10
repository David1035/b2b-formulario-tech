const apiBaseUrl = 'https://b2b-formulario-tech.vercel.app/api'; // URL base de la API en Vercel

// Función para obtener el tiempo total y promedio de la API y mostrarlo en el id 'conteoDiario'
async function mostrarTiempoTotal() {
    try {
        const response = await fetch(`${apiBaseUrl}/registros/tiempoTotal`);  // Usar URL completa
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        
        // Asegúrate de que tiempoGlobal y promedio sean números
        const tiempoGlobal = Number(data.tiempoGlobal || 0);  // Tiempo total en segundos
        const promedio = Number(data.promedio || 0);          // Promedio de tiempo en segundos
        const cantidadIngresos = Number(data.cantidadIngresos || 0);  // Cantidad de registros

        // Insertar los valores en el elemento con id 'conteoDiario'
        document.getElementById('conteoDiario').textContent = 
            `AHT: ${promedio.toFixed(0)} segundos, ` +  // Promedio de tiempo en segundos
            `Total: ${tiempoGlobal.toFixed(0)} segundos, ` +  // Tiempo total en segundos
            `Iteraciones: ${cantidadIngresos}`;
    } catch (error) {
        console.error('Error al obtener el tiempo total:', error);
        document.getElementById('conteoDiario').textContent = 'Error al cargar los datos';
    }
}

// Función para enviar datos al servidor
async function enviarDatosAlServidor() {
    const data = {
        id_llamada: document.getElementById('id-llamada').value,
        nombreClient: document.getElementById('nombre-client').value,
        documentoCliente: document.getElementById('document').value,
        smnet: document.getElementById('smnet').value,
        tipiWeb: document.getElementById('tipiWeb').value,
        observacionesReporte: document.getElementById('observaciones').value,
        tecnologia: document.getElementById('tecnologia').value,
        tiposervicio: document.getElementById('tiposervicio').value,
        naturaleza: document.getElementById('naturaleza').value,
        celular: document.getElementById('celular').value,
        horario_b2b: document.getElementById('horario_b2b').value,
        modoback: document.getElementById('modoback').value,
        nombre_atiende: document.getElementById('nombre_atiende')?.value || '',
        celular_atiende: document.getElementById('celular_atiende')?.value || '',
        dias_atiende: document.getElementById('dias_atiende')?.value || '',
        horario_atiende: document.getElementById('horario_atiende')?.value || '',
        fechaActual: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        horaInicial: new Date(horaInicial).toISOString(), // Hora inicial en formato ISO
        horaFinal: new Date().toISOString(), // Hora final en formato ISO
    };

    try {
        const response = await fetch(`${apiBaseUrl}/registros`, {  // Usar URL completa
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.text();
            console.log('Datos guardados correctamente:', result);
        } else {
            console.error('Error al guardar los datos:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar los datos al servidor:', error);
    }

    // Actualizar los datos de tiempo total después de enviar
    mostrarTiempoTotal();
}

// Llama a la función para mostrar el tiempo total al cargar la página
mostrarTiempoTotal();
