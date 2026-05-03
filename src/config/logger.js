const pino = require('pino');
const config = require('./env');

const logger = pino({
    level: config.logLevel,
    redact: {
        paths: [
            'req.headers.authorization',
            '*.ACCESS_TOKEN',
            'err.config.url' // Evita loguear la URL completa si falla (oculta el token en query params)
        ],
        censor: '[ENMASCARADO_POR_SEGURIDAD]'
    },
    transport: {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' }
    }
});

module.exports = logger;