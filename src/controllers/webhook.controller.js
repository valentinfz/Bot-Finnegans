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

        if (messageData) {
            logger.info(`Nuevo mensaje entrante procesado vía Webhook`);
            await messageService.procesarMensajeEntrante(messageData.from, messageData.text.body);
        }
        res.sendStatus(200); // Meta exige respuesta rápida
    } catch (error) {
        logger.error({ err: error }, 'Fallo en la capa de controladores del Webhook');
        res.sendStatus(500);
    }
};

module.exports = { verificarWebhook, recibirMensaje };