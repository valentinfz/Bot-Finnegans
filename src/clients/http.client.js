const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const logger = require('../config/logger');

const httpClient = axios.create({
    timeout: 5000, // Timeout estricto de 5s
});

axiosRetry(httpClient, { 
    retries: 3, 
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
    },
    onRetry: (retryCount, error, requestConfig) => {
        logger.warn(`Reintento ${retryCount} hacia Finnegans debido a error: ${error.message}`);
    }
});

module.exports = httpClient;