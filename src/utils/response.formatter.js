// Plantillas puras
const templateEstadoCaso = (ticket) => {
    return `*Caso #${ticket.nroCaso}*\nAsunto: ${ticket.titulo}\nEstado actual: *${ticket.estado}*`;
};

const templatePartner = (ticket) => {
    return `Tu caso #${ticket.nroCaso} está siendo gestionado directamente por tu partner (*${ticket.partner}*). Por favor, contactalos a ellos para más detalles sobre el avance.`;
};

const templateErrorValidacion = () => {
    return `¡Hola! Soy el asistente virtual de soporte. 🤖\n\nPor favor, escribí *únicamente el número de tu caso* (por ejemplo: 12345) para consultar su estado actual.`;
};

const templateNoEncontrado = (numero) => {
    return `No logré encontrar un caso activo con el número ${numero}. Por favor, verificá que esté bien escrito o consultá en el portal.`;
};

const templateErrorSistema = () => {
    return `Disculpá, los sistemas de consulta están temporalmente fuera de servicio. Intentá nuevamente más tarde.`;
};

module.exports = {
    templateEstadoCaso,
    templatePartner,
    templateErrorValidacion,
    templateNoEncontrado,
    templateErrorSistema
};