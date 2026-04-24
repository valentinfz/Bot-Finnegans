const config = require('../config/env');

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
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Finnegans API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('[FinnegansClient] Falla en la conexión:', error.message);
            throw error; // Propaga el error para que el Service decida qué hacer
        }
    }
}

module.exports = new FinnegansClient();