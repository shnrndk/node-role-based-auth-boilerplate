require ('dotenv').config();

module.exports = {
    DB: process.env.APP_DB_URL,
    PORT: process.env.APP_PORT,
    SECRET: process.env.APP_SECRET
};