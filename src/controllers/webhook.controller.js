const config = require('../config/env');
const logger = require('../config/logger');
const messageService = require('../services/message.service');

const verificarWebhook = (req, res) => {
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (token === config.meta.verifyToken) {
        logger.info('Webhook verificado exitosamente por Meta');
        return res.status(200).send(challenge);
    }
    logger.warn('Intento de verificación de webhook fallido (Token inválido)');
    res.sendStatus(403);
    
};

const recibirMensaje = async (req, res) => {

    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const messageData = changes?.value?.messages?.[0];

        const texto = messageData?.text?.body;
        const numero = messageData?.from;

        if (messageData && texto && numero) {
            logger.info(`Nuevo mensaje entrante procesado vía Webhook`);
            await messageService.procesarMensajeEntrante(numero, texto);
        } else {
            logger.warn("Mensaje recibido sin texto o estructura no válida");
        }

        res.sendStatus(200);

    } catch (error) {
        logger.error({ err: error }, 'Fallo en el controlador del Webhook');
        res.sendStatus(500);
    }
};

module.exports = { verificarWebhook, recibirMensaje };