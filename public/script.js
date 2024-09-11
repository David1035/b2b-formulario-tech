
async function mostrarTiempoTotal() {
    try {
        const response = await fetch('/api/registros/tiempoTotal'); 
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        
        const tiempoGlobal = Number(data.tiempoGlobal || 0);  
        const promedio = Number(data.promedio || 0);         
        const cantidadIngresos = Number(data.cantidadIngresos || 0);  

        document.getElementById('conteoDiario').textContent = 
            `AHT: ${promedio.toFixed(0)}, ` +  // Promedio de tiempo en segundos
            `Total: ${tiempoGlobal.toFixed(0)}, ` +  // Tiempo total en segundos
            `Iteraciones: ${cantidadIngresos}`;
    } catch (error) {
        console.error('Error al obtener el tiempo total:', error);
        document.getElementById('conteoDiario').textContent = 'Error al cargar los datos';
    }
}

mostrarTiempoTotal();




async function enviarDatosAlServidor() {
    // Recopila los datos del formulario ok
    
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
        horaInicial: new Date(horaInicial).toISOString(), // Hora actual en formato ISO
        horaFinal: new Date().toISOString(), // Hora actual en formato ISO
    };

    /*// Verifica que el campo id_llamada no esté vacío
    if (!data.id_llamada) {
        alert('El ID de llamada es obligatorio.');
        return;
    }*/
        
    try {
        const response = await fetch('/api/registros', {
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

    mostrarTiempoTotal();
}