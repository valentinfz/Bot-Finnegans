const config = require('../config/env');

class FinnegansRepository {
    async obtenerEstadoTicket(numeroTicket) {
        const currentYear = new Date().getFullYear();
        const fechaDesde = `${currentYear}-01-01`;
        const fechaHasta = new Date().toISOString().split('T')[0];

        const params = new URLSearchParams({
            ACCESS_TOKEN: config.finnegans.accessToken,
            PARAMCasosDesde: fechaDesde,
            PARAMCasosHasta: fechaHasta,
            PARAMNumeroInterno: numeroTicket
        });

        const url = `${config.finnegans.apiUrl}/reports/CasosCBG?${params.toString()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Finnegans API Error: ${response.status}`);
            
            const data = await response.json();
            
            if (data && data.length > 0) {
                return { 
                    encontrado: true, 
                    nroCaso: data[0].CASO, 
                    estado: data[0].ESTADO, 
                    titulo: data[0].TITULO 
                };
            }
            return { encontrado: false };
        } catch (error) {
            console.error('[FinnegansRepository] Error:', error.message);
            throw error; 
        }
    }
}

module.exports = new FinnegansRepository();