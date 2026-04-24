const config = require('../config/env');
const mockRepo = require('./mock.repository');
const finnegansRepo = require('./finnegans.repository');

class RepositoryFactory {
    static getTicketRepository() {
        if (config.useMockData) {
            console.log("Usando Mock Repository");
            return mockRepo;
        } else {
            console.log("Usando Finnegans API Repository");
            return finnegansRepo;
        }
    }
}

module.exports = RepositoryFactory;