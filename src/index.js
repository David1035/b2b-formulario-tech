import express from 'express';
import cors from 'cors';
import conectarDB from '../configDB/db.js';
import routerN2 from '../routes/RoutesClientes.js'; // Este es el router que ya tienes para N2
import routerN1 from '../routes/RoutesNivel1.js'; // Este sería el nuevo router para N1

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configurar los routers para diferentes niveles
app.use('/api/registros', routerN2); // Rutas para nivel N2
app.use('/api/registronivel1s', routerN1); // Rutas para nivel N1

const port = 5000;

try {
    await conectarDB.authenticate();
    console.log('Conexión con BD exitosa');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

app.listen(port, () => {
    console.log('El servidor está corriendo en http://localhost:' + port + '/');
});
