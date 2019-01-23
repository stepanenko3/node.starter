const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:root@127.0.0.1:8889/reshop');
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },

    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'layouts')
}))
app.set('view engine', '.hbs');

app.get('/', (request, response) => {
    User.findAll().then(users => {
        response.json(users)
    });


})

app.listen(3000)