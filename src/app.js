const express = require("express");
const path = require('path');
const morgan = require('morgan');
const dateFormat = require('dateformat')
// const { format } = require('timeago.js')

const IndexPagos = require("./routes/pagos");
const IndexCtdor = require("./routes/container");
const IndexVerpa = require("./routes/verpagos");
const IndexClient = require("./routes/clients");
const IndexDeuda = require('./routes/deuda');
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
    // app.locals.TOTAL_CONTAINERS= 28; //delete it urgent
    next();
});

// importing routes
app.use('/', IndexPagos);
app.use('/', IndexVerpa);
app.use('/', IndexCtdor);
app.use('/', IndexClient);
app.use('/', IndexDeuda);
// local variables
require('./database');

app.use(express.static(__dirname + '/public'));
/**
 * Function global that return client-data to /pagos/add in string format,
 * @returns string
 */
app.locals.mostrar = function (ctdorid, clientid, cliname) {
    // console.log(cliname);
    return `${ctdorid},${clientid},${cliname}`;
};
app.locals.getstring = function(ctdorid, nombre){
    let idplusname = (ctdorid < 10)? '0'+ ctdorid: ctdorid;
    idplusname += `.${nombre}`;
    return idplusname;
};
app.locals.getSaldo = function (deuda, pagos) {
    return parseInt(deuda - pagos);
}
/* app.locals.alert = function(idPago) {
    console.log(idPago);
    return ({
        title: 'Do you want to save the changes? '+ idPago,
        showCancelButton: true,
        confirmButtonText: `Borrar`,
        html: true
    });
}
 */
// Starting...
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
});
