import conectarDB from "../configDB/db.js";
import { DataTypes } from "sequelize";

const RegistrosTigo = conectarDB.define('registros', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_llamada: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    nombreClient: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documentoCliente: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    observacionesReporte: {
        type: DataTypes.STRING,
        allowNull: true
    },
    smnet: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipiWeb: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tecnologia: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    tiposervicio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    naturaleza:{
        type: DataTypes.STRING,
        allowNull:true
    },
    celular:{
        type: DataTypes.STRING,
        allowNull:true
    },
    horario_b2b:{
        type: DataTypes.STRING,
        allowNull:true
    },
    modoback:{
        type: DataTypes.STRING,
        allowNull:true
    },
    nombre_atiende:{
        type: DataTypes.STRING,
        allowNull:true
    },
    celular_atiende:{
        type: DataTypes.STRING,
        allowNull:true
    }
    ,
    dias_atiende:{
        type: DataTypes.STRING,
        allowNull:true
    }
    ,
    horario_atiende:{
        type: DataTypes.STRING,
        allowNull:true
    },
    fechaActual: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horaInicial: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horaFinal: {
        type: DataTypes.DATE,
        allowNull: false
    },


})

export default RegistrosTigo;