//@ts-check

const { Router } = require("express");
const Client = require("../models/Client");
const Pago = require("../models/Pago");

const router = Router();

router.get('/verpagos', async function (req, res) {
    const clients = await Client.find();
    res.render('verpagos', { 'clients': clients, pagos: [], clientname: '' });
});

router.post('/verpagos', async function (req, res) {
    const { idclient } = req.body;
    let filter = { 'client': idclient }
    const pagos = await Pago.find(filter);
    // console.log(`Pagos: ${pagos}`);
    const clients = await Client.find();

    let filtro = { '_id': idclient }
    const objclient = await Client.findOne(filtro);
    const clientname = objclient.name;
    res.render('verpagos', { 'clients': clients, 'pagos': pagos, clientname });
});


module.exports = router;
