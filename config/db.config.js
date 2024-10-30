const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

MongoMemoryServer.create() // Crear una instancia de MongoMemoryServer
.then((mongoServer) => 
    mongoose.connect(mongoServer.getUri(),{
        dbName: 'tarea_semana_2', // Nombre de la base de datos
    }) // Conectar Mongoose a nuestro servidor en memoria
)
.then(() => console.info('Successfully connected to the database'))
.catch((error) => {
    console.error("An error occurred trying to connect to the database",error);
    process.exit(1);
});

process.on('SIGINT', () => {
    mongoose.disconnect()
    .then(() => {
        console.info('Successfully disconnected the database');
        process.exit(0);
    })
    .catch((error) => {
        console.error('An error occurred trying to disconnect the database',error);
        process.exit(1);
    });
});