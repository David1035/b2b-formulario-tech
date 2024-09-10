import { Sequelize } from "sequelize";

const conectarDB = new Sequelize({
    dialect: 'sqlite',
    storage: './clientesTigo.db'
})

export default conectarDB;