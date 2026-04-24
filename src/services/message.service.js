const config = require('../config/env');

class MessageService {
    async procesarMensajeEntrante(numeroUsuario, textoRecibido) {
        const ticketService = require('./ticket.service');
        
        const textoLimpio = textoRecibido.trim();
        const esNumero = /^\d+$/.test(textoLimpio);

        let respuesta = esNumero 
            ? await ticketService.consultarEstado(textoLimpio)
            : "¡Hola! Por favor, enviá solo el número de tu ticket.";

        console.log(`[BOT] Respuesta generada para ${numeroUsuario}`);
        this.enviarMensajeWhatsApp(numeroUsuario, respuesta);
    }

    async enviarMensajeWhatsApp(numeroDestino, mensaje) {
        console.log(`\n[WHATSAPP OUT] -> ${numeroDestino}: \n${mensaje}\n`);
    }
}

module.exports = new MessageService();