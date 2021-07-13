const { Router } = require("express");
const Pago = require("../models/Pago");

const router = Router();

router.get('/', async (req, res) => {
    // Show all the payments of all clients.
    const pagos = await Pago.find();
    res.render('index', { pagos: pagos });
});

router.post('/add-pay', async (req, res) => {
    console.log("Adding pago to database...");

    const pago = new Pago(req.body);
    await pago.save();

    res.redirect('/');
});

// 
router.get('/delete/:getid', async (req, res, next) => {
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