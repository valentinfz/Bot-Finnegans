const express = require('express');
const config = require('./config/env');
const logger = require('./config/logger');
const webhookRoutes = require('./routes/webhook.routes');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
});

// Rutas
app.use('/api', webhookRoutes);

app.listen(config.port, () => {
    logger.info(`Servidor inicializado y escuchando en el puerto ${config.port}`);
    logger.info(`Entorno de Datos Configurado: ${config.useMockData ? `MOCK API (${config.finnegans.apiUrl})` : 'FINNEGANS API (Producción)'}`);
});