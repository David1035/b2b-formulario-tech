import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde .env

const conectarDB = new Sequelize(
  process.env.MYSQL_DATABASE,  // Nombre de la base de datos
  process.env.MYSQL_USER,      // Usuario de la base de datos
  process.env.MYSQL_PASSWORD,  // Contraseña del usuario
  {
    host: process.env.MYSQL_HOST,   // Dirección del servidor MySQL
    port: process.env.MYSQL_PORT || 3306, // Puerto, 3306 es el predeterminado
    dialect: 'mysql',               // Usamos MySQL
    logging: false,                 // Puedes activar esto para ver las consultas en consola
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false   // Ignorar certificados auto-firmados
      }
    }
  }
);

export default conectarDB;
