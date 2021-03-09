const express = require('express')
const app = express()
const mongoose = require('mongoose');
const consola = require('consola');
const cors = require('cors');
const routes = require('./routes/users')
const { DB, PORT } = require('./config')

app.use(express.json())

app.use("/api/v1/users", routes);

//app.use(cors);

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
        //startApp()
    }
};

startApp();




