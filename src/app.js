const express = require('express');
const config = require('./config/env');
const webhookRoutes = require('./routes/webhook.routes');

const app = express();
app.use(express.json());

console.log('Tipo de webhookRoutes:', typeof webhookRoutes); 

app.use('/api', webhookRoutes);

app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
    console.log(`Base de datos: ${config.useMockData ? 'MOCK' : 'FINNEGANS'}`);
});