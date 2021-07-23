const { Router } = require("express");
 const Client = require("../models/Client");
//const Pago = require("../models/Pago");

const router = Router();

router.get('/clients/edit/:idclient', async (req, res) => {
    // Show data person of one client.
    const {idclient}= req.params;
    const cliente = await Client.find({_id: idclient});
    res.render('profile', { container: container });
});

router.post('/clients/edit', async (req, res) => {
    console.log("Adding a new client to database...");

    const cliente = new Client(req.body);
    await cliente.save();

    res.redirect('/');
});

// router.get('/delete/:getid', async(req, res,next) => {
//     const { getid } = req.params;
//      const pago = await Pago.findByIdAndDelete(getid);
//     console.log(`Delete pago: /${getid}`);

//     res.redirect('/');
// });

// router.get('/:getid', async(req, res,next) => {
//     const { getid } = req.params;
//     const pago = await Pago.findOne(getid);
//     console.log(`Get object: /${getid}`);

//     res.redirect('/');
// });

module.exports = router;