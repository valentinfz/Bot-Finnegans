const config = require('../config/env');
const messageService = require('../services/message.service');

const verificarWebhook = (req, res) => {
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (token === config.meta.verifyToken) {
        return res.status(200).send(challenge);
    }
    res.sendStatus(403);
};

const recibirMensaje = async (req, res) => {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const messageData = changes?.value?.messages?.[0];

        if (messageData) {
            await messageService.procesarMensajeEntrante(messageData.from, messageData.text.body);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Error en controlador:", error);
        res.sendStatus(500);
    }
};

module.exports = { verificarWebhook, recibirMensaje };