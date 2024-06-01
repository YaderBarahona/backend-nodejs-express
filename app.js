const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const returnRoutes = require('./routes/returnRoutes');
require('dotenv').config(); // Para cargar variables de entorno desde el archivo .env

const app = express();

// Conectar a la base de datos
connectDB();

// Configurar middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/returns', returnRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
