import RegistrosNivel1 from "../models/registroNivel1.js";



// Función para agregar un registro
export const agregarRegistro = async (req, res) => {
    try {
        await RegistrosNivel1.create(req.body);
        res.json({ msg: 'Se agregó un registro' });
    } catch (error) {
        res.json({ msg: error.message });
    }
};

// Función para mostrar todos los registros
export const getAllRegistros = async (req, res) => {
    try {
        const registros = await RegistrosNivel1.findAll({
            order: [['id', 'DESC']], // Ordenar por ID de forma descendente para obtener los últimos registros
            limit: 20                // Limitar a los últimos 20 registros
        });
        res.json(registros);
    } catch (error) {
        res.json({ msg: error.message });
    }
};

// Función para mostrar un registro por ID
export const getRegistro = async (req, res) => {
    try {
        const registro = await RegistrosNivel1.findAll({
            where: { id: req.params.id }
        });
        res.json(registro[0]);
    } catch (error) {
        res.json({ msg: error.message });
    }
};

// Función para modificar un registro por ID
export const modificarRegistro = async (req, res) => {
    try {
        await RegistrosNivel1.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ msg: 'Se modificó un registro' });
    } catch (error) {
        res.json({ msg: error.message });
    }
};

// Función para eliminar un registro por ID o ID de llamada
export const eliminarRegistro = async (req, res) => {
    try {
        const { id, id_llamada } = req.params;

        if (id) {
            await RegistrosNivel1.destroy({
                where: { id }
            });
            res.json({ msg: `Se eliminó el registro con id ${id}` });
        } else if (id_llamada) {
            await RegistrosNivel1.destroy({
                where: { id_llamada }
            });
            res.json({ msg: `Se eliminó el registro con id_llamada ${id_llamada}` });
        } else {
            res.status(400).json({ msg: 'Debe proporcionar un id o un id_llamada para eliminar' });
        }
    } catch (error) {
        res.json({ msg: error.message });
    }
};

// Función para obtener el tiempo total por registro
export const obtenerTiempoTotalPorRegistro = async (req, res) => {
    try {
        const registros = await RegistrosNivel1.findAll({
            attributes: ['horaInicial', 'horaFinal']
        });

        const registrosConTiempo = registros.map(registro => {
            const horaInicial = new Date(registro.horaInicial).getTime();
            const horaFinal = new Date(registro.horaFinal).getTime();

            let tiempoTotal = 0;
            if (!isNaN(horaInicial) && !isNaN(horaFinal)) {
                tiempoTotal = (horaFinal - horaInicial) / 1000; // tiempo en segundos
            } else {
                console.error('Fechas inválidas en la base de datos');
            }

            return {
                ...registro.dataValues, // conservar los valores originales del registro
                tiempoTotal // añadir el tiempo total calculado
            };
        });

        res.json(registrosConTiempo);
    } catch (error) {
        console.error('Error en obtenerTiempoTotalPorRegistro:', error);
        res.status(500).json({ msg: 'Error al obtener los datos de la base de datos' });
    }
};

// Función para obtener el tiempo total y promedio de todos los registros
export const obtenerTiempoTotal = async (req, res) => {
    try {
        const registros = await RegistrosNivel1.findAll({
            attributes: ['horaInicial', 'horaFinal']
        });

        let tiempoGlobal = 0;
        let cantidadIngresos = registros.length;

        registros.forEach(row => {
            let horaInicial = new Date(row.horaInicial);
            let horaFinal = new Date(row.horaFinal);

            if (!isNaN(horaInicial.getTime()) && !isNaN(horaFinal.getTime())) {
                let tiempoIngreso = (horaFinal.getTime() - horaInicial.getTime()) / 1000; // tiempo en segundos
                tiempoGlobal += tiempoIngreso;
            } else {
                console.error('Fechas inválidas en la base de datos');
            }
        });

        const promedio = cantidadIngresos > 0 ? tiempoGlobal / cantidadIngresos : 0;

        res.json({ 
            tiempoGlobal: tiempoGlobal.toFixed(2),  // Tiempo total en segundos
            promedio: promedio.toFixed(2),          // Promedio de tiempo en segundos
            cantidadIngresos 
        });

    } catch (error) {
        console.error('Error al obtener los datos de la base de datos:', error);
        res.status(500).json({ msg: 'Error al obtener los datos de la base de datos' });
    }
};
