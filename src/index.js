import express from 'express';
import cors from 'cors';
import conectarDB from '../configDB/db.js';  // Asegúrate de que la ruta sea correcta
import routerN2 from '../routes/RoutesClientes.js';  // Rutas para nivel N2
import routerN1 from '../routes/RoutesNivel1.js';    // Rutas para nivel N1
import dotenv from 'dotenv';

// Cargar las variables de entorno desde .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configurar los routers para diferentes niveles
app.use('/api/registros', routerN2);  // Rutas para nivel N2
app.use('/api/registronivel1s', routerN1);  // Rutas para nivel N1

const port = process.env.PORT || 5000;  // Usar el puerto desde la variable de entorno o 5000 por defecto

// Conectar a la base de datos y sincronizar tablas
(async () => {
    try {
        await conectarDB.authenticate();
        console.log('Conexión con BD exitosa');
        
        // Sincronizar todas las tablas definidas en los modelos
        await conectarDB.sync({ alter: true });  // 'alter' ajusta la tabla a los cambios en los modelos
        console.log('Sincronización de tablas completada.');

        // Iniciar el servidor después de la conexión y sincronización
        app.listen(port, () => {
            console.log(`El servidor está corriendo en http://localhost:${port}/`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

/*
import express from 'express';
import cors from 'cors';
import conectarDB from '../configDB/db.js';  // Verifica que la ruta sea correcta
import routerN2 from '../routes/RoutesClientes.js';  // Rutas para nivel N2
import routerN1 from '../routes/RoutesNivel1.js';    // Rutas para nivel N1
import RegistrosTigo from '../models/registrosTigo.js';  // Modelo para la tabla registros
import RegistroNivel1 from '../models/registroNivel1.js';  // Modelo para la tabla registronivel1s
import dotenv from 'dotenv';

// Cargar las variables de entorno desde .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configurar los routers para diferentes niveles
app.use('/api/registros', routerN2);  // Rutas para nivel N2
app.use('/api/registronivel1s', routerN1);  // Rutas para nivel N1

const port = process.env.PORT || 5000;  // Usar el puerto desde la variable de entorno o 5000 por defecto

// Conectar a la base de datos y sincronizar tablas
(async () => {
    try {
        await conectarDB.authenticate();
        console.log('Conexión con BD exitosa');

        // Sincronizar la tabla "registros" con force: true para recrearla si ya existe
        await RegistrosTigo.sync({ force: true });  // Esto elimina y recrea la tabla registros
        console.log('Tabla "registros" sincronizada correctamente.');

        // Sincronizar la tabla "registronivel1s" con force: true para recrearla si ya existe
        await RegistroNivel1.sync({ force: true });  // Esto elimina y recrea la tabla registronivel1s
        console.log('Tabla "registronivel1s" sincronizada correctamente.');

        // Iniciar el servidor después de la conexión y sincronización
        app.listen(port, () => {
            console.log(`El servidor está corriendo en http://localhost:${port}/`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();


*/