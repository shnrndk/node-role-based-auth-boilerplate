const express = require('express')
const app = express()
const mongoose = require('mongoose');
const consola = require('consola');
const cors = require('cors');
const routes = require('./routes/users')
const morgan = require('morgan');
const { DB, PORT } = require('./config');
const passport = require('passport');

app.use(express.json())
app.use(morgan('tiny'))
app.use(passport.initialize())

//Initializing the strategy
require('./middlewares/passport')(passport);
//app.use(cors);

app.use("/api/v1/users", routes);

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




