class MockRepository {
    async obtenerEstadoTicket(numeroTicket) {
        console.log(`[MOCK] Buscando ticket ${numeroTicket} en base de datos simulada...`);
        
        const baseDeDatos = {
            "12345": { CASO: "12345", ESTADO: "En revisión", TITULO: "Error en facturación" },
            "98765": { CASO: "98765", ESTADO: "Cerrado", TITULO: "Consulta de stock" }
        };

        // Simulamos delay de red de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000));

        const ticket = baseDeDatos[numeroTicket];
        if (ticket) {
            return { encontrado: true, nroCaso: ticket.CASO, estado: ticket.ESTADO, titulo: ticket.TITULO };
        }
        return { encontrado: false };
    }
}

module.exports = new MockRepository();