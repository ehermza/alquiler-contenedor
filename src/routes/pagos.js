/** @module pagos */

const { Router } = require("express");
const router = Router();

const Pago = require("../models/Pago");
const Ctdor = require("../models/Container");
const Client = require("../models/Client");

async function getTotal(id_ctdor, id_client) {
    const filter = {
        'client': id_client,
        'id_container': id_ctdor
    };
    const pagos_client = await Pago.find(filter);

    let total = 0;
    // console.log(filter);
    pagos_client.forEach(function (pago) {
        total += parseInt(pago.value);

    });
    console.log(`PAGOS, Total Container: ${id_ctdor}: ${total}`);
    return total;
}

router.get('/', async (req, res) => {
    // Show all the payments of all clients.
    const orderby = { paid_at: -1 };
    const pagos = await Pago.find().sort(orderby);
    const ctdores = await Ctdor.find();

    res.render('index', { pagos: pagos, containers: ctdores });
});
/**
 * Get inputs data from view/index.ejs Form and charge Pago properties
 *  to save to database.<br> 
 *  Later, find all pays to Client selected and calculate total pays
 *   for update the value on database: Client.pagos_total prop.
 * @name AddPago
 * @api {POST} /pagos/add
 */
router.post('/pagos/add', async function (req, res) {
    console.log("Adding payment to database...");

    const { objclient, value, ticket } = req.body;
    const obj = objclient.split(',');
    const id_ctdor = obj[0];
    const id_client = obj[1];
    const nombre = obj[2];
    console.log(`/pagos/add Request body: ${req.body.objclient}`);

    // const pago = new Pago(req.body);
    const properties = {
        client: id_client,
        client_name: nombre,
        value: value,
        month_paid: '...',
        paid_at: new Date(),
        recibo_n: ticket,
        id_container: id_ctdor,
    }
    const pago = new Pago(properties);
    await pago.save();

    const totalpagos = await getTotal(id_ctdor, id_client);
    const dato = { 'pagos_total': totalpagos };
    await Client.findByIdAndUpdate(id_client, dato);

    res.redirect('/');
});

// 
router.get('/pagos/delete/:getid', async (req, res, next) => {
    // Delete the selected paid  
    const { getid } = req.params;
    const pago = await Pago.findByIdAndDelete(getid);
    console.log(`Delete pago: /${getid}`);

    res.redirect('/');
});


// router.get('/:getid', async(req, res,next) => {
//     const { getid } = req.params;
//     const pago = await Pago.findOne(getid);
//     console.log(`Get object: /${getid}`);

//     res.redirect('/');
// });

module.exports = router;