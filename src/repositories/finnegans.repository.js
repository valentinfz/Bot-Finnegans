const finnegansClient = require('../clients/finnegans.client');
const { CrmResponseSchema } = require('../schemas/crm.schema');
const logger = require('../config/logger');

class FinnegansRepository {
    async obtenerEstadoTicket(numeroTicket) {
        const currentYear = new Date().getFullYear();
        const fechaDesde = `${currentYear}-01-01`;
        const fechaHasta = new Date().toISOString().split('T')[0];

        try {
            const rawData = await finnegansClient.getCasosCBG(fechaDesde, fechaHasta, numeroTicket);
            
            // Validación estricta con Zod
            const parsedData = CrmResponseSchema.parse(rawData);

            if (parsedData && parsedData.length > 0) {
                const ticket = parsedData[0];
                return {
                    encontrado: true,
                    nroCaso: ticket.CASO,
                    estado: ticket.ESTADO,
                    titulo: ticket.TITULO || "Sin Asunto",
                    partner: ticket["RAMA PROPIETARIO 1"] !== "Cliente Directo" ? ticket["RAMA PROPIETARIO 1"] : null
                };
            }
            return { encontrado: false };

        } catch (error) {
            logger.error({ err: error }, 'Error procesando datos del CRM');
            throw new Error('Fallo al obtener ticket del CRM');
        }
    }
}

module.exports = new FinnegansRepository();