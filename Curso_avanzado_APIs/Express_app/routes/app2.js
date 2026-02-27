const express = require('express');
const app = express();
app.use(express.json());

// Rutas
const alumnosRoutes = require('./routes/alumnos');
app.use('/api/alumnos', alumnosRoutes);

// Base de datos
const sequelize = require('./config/database');

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Crea/actualiza tablas
    console.log('Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('Error al sincronizar tablas:', error);
  }
})();

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
