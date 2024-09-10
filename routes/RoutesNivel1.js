import express from 'express';
import { 
    obtenerTiempoTotal,
    getAllRegistros, 
    getRegistro, 
    agregarRegistro, 
    modificarRegistro, 
    eliminarRegistro 
} from '../controllers/nivel1Controlls.js'; 

const router = express.Router();

router.get('/tiempoTotal', obtenerTiempoTotal);
router.get('/', getAllRegistros);
router.get('/:id', getRegistro);
router.post('/', agregarRegistro);
router.put('/:id', modificarRegistro);
router.delete('/:id', eliminarRegistro);
router.delete('/llamada/:id_llamada', eliminarRegistro); 

export default router;
