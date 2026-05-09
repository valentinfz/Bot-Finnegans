require('dotenv').config();

const useMockData = process.env.USE_MOCK_DATA === 'true';

module.exports = {
    port: process.env.PORT || 3000,
    useMockData,
    logLevel: process.env.LOG_LEVEL || 'info',
    meta: {
        verifyToken: process.env.META_VERIFY_TOKEN,
        accessToken: process.env.META_ACCESS_TOKEN,
        phoneNumberId: process.env.META_PHONE_ID
    },
    finnegans: {
        apiUrl: useMockData
            ? (process.env.MOCK_API_URL || 'http://localhost:3002/api')
            : process.env.FINNEGANS_API_URL,
        accessToken: useMockData
            ? 'mock-token'
            : process.env.FINNEGANS_ACCESS_TOKEN
    }
};
