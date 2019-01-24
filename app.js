const path = require('path')
const express = require('express')
const app = express()
const config = require('./config');
const models = require('./models')
const bodyParser = require('body-parser')
const expressWs = require('express-ws')(app);

const apiRouter = require('./routes');
const wsRouter = require('./routes/ws');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    models.configuration.findAll().then(data => {
        config.load(data)
    });

    next();
});

app.use('/api', apiRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(err);
});

app.listen(config.get('port'))