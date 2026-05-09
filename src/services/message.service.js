const axios = require('axios');
const config = require('../config/env');
const logger = require('../config/logger');
const parser = require('../utils/intent.parser');
const formatter = require('../utils/response.formatter');

class MessageService {

    async procesarMensajeEntrante(numeroUsuario, textoRecibido) {

        const ticketService = require('./ticket.service');

        logger.info(`Analizando intención del mensaje de ${numeroUsuario}`);

        const numeroTicketDetectado = parser.extraerNumeroCaso(textoRecibido);

        let respuestaCrm;

        if (numeroTicketDetectado) {
            logger.debug(`Intención detectada: Consulta de ticket #${numeroTicketDetectado}`);
            respuestaCrm = await ticketService.consultarEstado(numeroTicketDetectado);
        } else {
            logger.debug(`Intención no detectada. Solicitando formato correcto.`);
            respuestaCrm = formatter.templateErrorValidacion();
        }

        await this.enviarMensajeWhatsApp(numeroUsuario, respuestaCrm);
    }

    async enviarMensajeWhatsApp(numeroDestino, mensaje) {

        const url = `https://graph.facebook.com/v19.0/${config.meta.phoneNumberId}/messages`;

        try {
            await axios.post(
                url,
                {
                    messaging_product: "whatsapp",
                    to: numeroDestino,
                    type: "text",
                    text: {
                        body: mensaje
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${config.meta.accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            logger.info(`[WA_OUT] Mensaje enviado correctamente a ${numeroDestino}`);

        } catch (error) {
            logger.error(
                {
                    err: error.response?.data || error.message
                },
                "Error enviando mensaje a WhatsApp"
            );
        }
    }
}

module.exports = new MessageService();