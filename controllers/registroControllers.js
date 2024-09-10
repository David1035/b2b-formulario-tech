import RegistrosTigo from "../models/registrosTigo.js";



//funciones para trabajar con el CRUD

//funcion para agregar 
export const agregarRegistro = async (req, res) => {
    try {
        /* El método create de Sequelize toma los datos que vienen en el cuerpo de la 
        solicitud (req.body) y los inserta en la base de datos, creando un 
        nuevo registro en la tabla "Citas".*/
        await RegistrosTigo.create(req.body);
        res.json({msg: 'se agregó un registro'})

    } catch (error) {
        res.json({msg: error.message})
    }
}

// funciones para mostrar todos los registros
/* export const getAllRegistros = async (req, res) => {
    try {
        const registros = await RegistrosTigo.findAll();
        res.json(registros);
    } catch (error) {
        res.json({msg: error.message})
    }
} */

export const getAllRegistros = async (req, res) => {
    try {
        const registros = await RegistrosTigo.findAll({
            order: [['id', 'DESC']], // Ordenar por ID de forma descendente para obtener los últimos registros
            limit: 20                // Limitar a los últimos 20 registros
        });
        res.json(registros);
    } catch (error) {
        res.json({ msg: error.message });
    }
};
    

//funcion para mostrar un registro
export const getRegistro = async (req, res) => {
    try {
        const registro = await RegistrosTigo.findAll({
            where: {id:req.params.id}
        });
        res.json(registro[0])
    } catch (error) {
        res.json({msg: error.message})
    }
}

// función para modificar un registro
export const modificarRegistro = async (req, res) => {
    try {
        await RegistrosTigo.update(req.body, {
            where: {id:req.params.id}
        });
        res.json({msg: 'se modifica un registro'})
    } catch (error) {
        res.json({msg: error.message})
    }
}

// función para eliminar un registro
/*export const eliminarRegistro = async (req, res) => {
    try {
        await RegistrosTigo.destroy({
            where: {id:req.params.id}
        });
        res.json({msg: 'se eliminó un registro'})
    } catch (error) {
        res.json({msg: error.message})
    }
}*/

// Función para eliminar un registro por ID o ID de llamada
export const eliminarRegistro = async (req, res) => {
    try {
        const { id, id_llamada } = req.params;

        if (id) {
            await RegistrosTigo.destroy({
                where: { id }
            });
            res.json({ msg: `Se eliminó el registro con id ${id}` });
        } else if (id_llamada) {
            await RegistrosTigo.destroy({
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




export const obtenerTiempoTotal = async (req, res) => {
    try {
        // Obtener los datos de horaInicial y horaFinal de la base de datos usando Sequelize
        const registros = await RegistrosTigo.findAll({
            attributes: ['horaInicial', 'horaFinal']
        });

        let tiempoGlobal = 0;
        let cantidadIngresos = registros.length;

        // Recorre todos los registros para calcular el tiempo total en segundos
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

        // Calcular tiempo total en segundos y el promedio en segundos
        const promedio = cantidadIngresos > 0 ? tiempoGlobal / cantidadIngresos : 0;

        // Responder con el tiempo total y promedio en segundos
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

export const getRegistrosNoModoBack = async (req, res) => {
    try {
        const registros = await RegistrosTigo.findAll({
            where: { modoback: "NO" }
        });
        res.json(registros);
    } catch (error) {
        res.json({ msg: error.message });
    }
};


export const updateModobackToSi = async (req, res) => {
    try {
        const { id } = req.params;
        await RegistrosTigo.update({ modoback: "SI" }, {
            where: { id }
        });
        res.json({ msg: 'Registro actualizado a MODO BACK: SI' });
    } catch (error) {
        res.json({ msg: error.message });
    }
};
