require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    useMockData: process.env.USE_MOCK_DATA === 'true',
    logLevel: process.env.LOG_LEVEL || 'info',
    meta: {
        verifyToken: process.env.META_VERIFY_TOKEN,
        accessToken: process.env.META_ACCESS_TOKEN,
        phoneNumberId: process.env.META_PHONE_ID
    },
    finnegans: {
        apiUrl: process.env.FINNEGANS_API_URL,
        accessToken: process.env.FINNEGANS_ACCESS_TOKEN
    }
};