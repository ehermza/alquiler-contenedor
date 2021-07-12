const { Router } = require("express");
 const Container = require("../models/Container");
//const Pago = require("../models/Pago");

const router = Router();

router.get('/profile', async(req, res) => {
    // Show all the payments of all clients.
    const container = await Container.find();
    res.render('profile', { container });
});

router.post('/add-client', async (req, res) => {
    console.log("Adding a new client to database...");

    const client = new Cliente(req.body);
    await client.save();

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