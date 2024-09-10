import conectarDB from "../configDB/db.js";
import { DataTypes } from "sequelize";

const RegistrosTigo = conectarDB.define('registros', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_llamada: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nombreClient: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    documentoCliente: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    observacionesReporte: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    smnet: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipiWeb: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tecnologia: {
        type: DataTypes.STRING(50),
        allowNull: true
    }, 
    tiposervicio: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    naturaleza: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    celular: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    horario_b2b: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    modoback: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nombre_atiende: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    celular_atiende: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    dias_atiende: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    horario_atiende: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fechaActual: {
        type: DataTypes.DATE,  // Guarda tanto fecha como hora
        allowNull: false
    },
    horaInicial: {
        type: DataTypes.DATE,  // Guarda tanto fecha como hora
        allowNull: false
    },
    horaFinal: {
        type: DataTypes.DATE,  // Guarda tanto fecha como hora
        allowNull: false
    }
}, {
    tableName: 'registros',
    timestamps: false
});

export default RegistrosTigo;
