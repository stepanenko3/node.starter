const path = require('path')
const express = require('express')
const app = express()
const config = require('./config')
const models = require('./models')
const bodyParser = require('body-parser')
const expressWs = require('express-ws')(app)
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars');
const router = require('./routes')
const middleware = require('./middleware')

app.engine('.hbs', exphbs());
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'))


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(middleware.auth().initialize())

app.use((req, res, next) => {
    models.configuration.findAll().then(data => config.load(data));
    next();
})

app.use('/api', router.api)

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