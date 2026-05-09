const logger = require('../config/logger');
const parser = require('../utils/intent.parser');
const formatter = require('../utils/response.formatter');

class MessageService {
    async procesarMensajeEntrante(numeroUsuario, textoRecibido) {
        const ticketService = require('./ticket.service'); // Importación interna para evitar dependencias circulares
        
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
        // Acá luego irá el código para hacer HTTP POST a la API de Meta
        logger.info(`[WA_OUT] -> Enviando mensaje a ${numeroDestino}`);
        console.log(`\n================== MENSAJE ==================\n${mensaje}\n=============================================\n`);
    }
}

module.exports = new MessageService();