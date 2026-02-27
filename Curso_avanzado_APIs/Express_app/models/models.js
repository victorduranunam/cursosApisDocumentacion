const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Tu archivo de conexión a la DB

const Alumno = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true, // Esto respeta tu UNIQUE INDEX
        validate: {
            isEmail: true // Validación extra de Node.js
        }
    }
}, {
    tableName: 'alumnos',
    timestamps: false // Tu SQL no tiene campos de fecha, así que desactivamos esto
});

module.exports = Alumno;