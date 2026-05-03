const httpClient = require('./http.client');
const config = require('../config/env');
const logger = require('../config/logger');

class FinnegansClient {
    async getCasosCBG(fechaDesde, fechaHasta, numeroInterno) {
        const params = new URLSearchParams({
            ACCESS_TOKEN: config.finnegans.accessToken,
            PARAMCasosDesde: fechaDesde,
            PARAMCasosHasta: fechaHasta,
            PARAMNumeroInterno: numeroInterno
        });

        const url = `${config.finnegans.apiUrl}/reports/CasosCBG?${params.toString()}`;

        try {
            logger.debug(`Ejecutando petición GET a Finnegans para ticket ${numeroInterno}`);
            const response = await httpClient.get(url);
            return response.data;
        } catch (error) {
            logger.error({ err: error }, `Falla crítica comunicando con API Finnegans para ticket ${numeroInterno}`);
            throw error;
        }
    }
}

module.exports = new FinnegansClient();