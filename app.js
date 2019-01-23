const path = require('path')
const express = require('express')
const app = express()
const config = require('./config');
const expressWs = require('express-ws')(app);

const api = require('./routes');

app.use('/api', api);

app.get('/', (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
}, (request, response) => {
    response.json('asd');
})

app.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {

        ws.send(JSON.stringify('11'));

    });
});

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