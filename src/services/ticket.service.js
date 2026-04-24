const RepositoryFactory = require('../repositories/repository.factory');

class TicketService {
    // Sacamos el constructor para evitar bloqueos en la carga
    
    async consultarEstado(numeroIngresado) {
        try {
            const ticketRepo = RepositoryFactory.getTicketRepository();
            const resultado = await ticketRepo.obtenerEstadoTicket(numeroIngresado);
            
            if (resultado.encontrado) {
                return `*Caso #${resultado.nroCaso}*\nAsunto: ${resultado.titulo}\nEstado actual: *${resultado.estado}*`;
            } else {
                return `No logré encontrar un caso con el número ${numeroIngresado}. Por favor, verificá que esté bien escrito.`;
            }
        } catch (error) {
            return "Disculpá, el sistema de tickets no está disponible en este momento. Intentá más tarde.";
        }
    }
}

module.exports = new TicketService();