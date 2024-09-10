// routes/RoutesClientes.js

import express from 'express';
import { 
    obtenerTiempoTotal,
    getAllRegistros, 
    getRegistro, 
    agregarRegistro, 
    modificarRegistro, 
    eliminarRegistro 
} from '../controllers/registroControllers.js'; // Asegúrate de importar correctamente

const router = express.Router();

// Ruta para obtener el tiempo total
router.get('/tiempoTotal', obtenerTiempoTotal);

// Rutas de los métodos CRUD
router.get('/', getAllRegistros);
router.get('/:id', getRegistro);
router.post('/', agregarRegistro);
router.put('/:id', modificarRegistro);
router.delete('/:id', eliminarRegistro);
router.delete('/llamada/:id_llamada', eliminarRegistro);  // Ruta para eliminar por id_llamada

export default router;

