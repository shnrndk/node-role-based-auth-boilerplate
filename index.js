const cors = require('cors');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const consola = require('consola');
const { DB, PORT } = require('./config')

app.use(cors);
app.use(bodyParser.json());

app.use('/api/v1/users', require('./routes/users'));

const startApp = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        consola.success({
            message: `Successfully connected to DB \n${DB}`,
            badge: true
        })

        app.listen(PORT, () => {
            consola.success({
                message: `Example app listening at http://localhost:${PORT}`,
                badge: true
            })
        })

    } catch (err) {
        consola.error({
            message: `Unable to connect to DB \n${err}`,
            badge: true
        })
        startApp()
    }
};

startApp();




