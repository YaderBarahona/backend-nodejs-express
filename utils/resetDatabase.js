const mongoose = require('mongoose');
require('dotenv').config();

const resetDatabase = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Obtener todas las colecciones en la base de datos
    const collections = await mongoose.connection.db.collections();

    // Eliminar cada colección
    for (let collection of collections) {
      await collection.drop();
      console.log(`Dropped collection: ${collection.collectionName}`);
    }

    console.log('Database has been reset');

    // Cerrar la conexión
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error during database reset:', error);
  }
};

resetDatabase();
