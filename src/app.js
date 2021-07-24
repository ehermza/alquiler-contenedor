const express = require("express");
const path = require('path');
const morgan = require('morgan');
const dateFormat  = require('dateformat')
// const { format } = require('timeago.js')

const IndexPagos = require("./routes/pagos");
const IndexCtdor = require("./routes/container");
const IndexClient = require("./routes/client")
const app = express();


// Initialize...
app.set('port', 4300);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + "/views"));


// middlewares... function those ejects before become the routes 
app.use(morgan('dev'));
// Que express() pueda entender datos enviados por form. (extended:false Without images)
app.use(express.urlencoded({ extended: false }));

// Globals variables
app.use((req, res, next) => {
    app.locals.dateFormat = dateFormat;
    next();
});

// importing routes
app.use('/', IndexPagos);
app.use('/', IndexCtdor);
app.use('/', IndexClient);

// local variables
require('./database');
app.use(express.static(__dirname + '/public'));

// Starting...
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
});
