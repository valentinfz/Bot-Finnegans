const config = require('../config/env');
const logger = require('../config/logger');
const mockRepo = require('./mock.repository');
const finnegansRepo = require('./finnegans.repository');

class RepositoryFactory {
    static getTicketRepository() {
        if (config.useMockData) {
            logger.info("Fábrica inyectando -> MockRepository");
            return mockRepo;
        } else {
            logger.info("Fábrica inyectando -> FinnegansRepository");
            return finnegansRepo;
        }
    }
}

module.exports = RepositoryFactory;