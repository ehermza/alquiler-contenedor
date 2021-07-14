const { Router } = require("express");
const Pago = require("../models/Pago");
const Ctdor = require("../models/Container");

const router = Router();

router.get('/', async (req, res) => {
    // Show all the payments of all clients.
    const pagos = await Pago.find();
    const ctdor = await Ctdor.find();

    res.render('index', { pagos: pagos, containers: ctdor });
});

router.post('/pagos/add', async (req, res) => {
    console.log("Adding payment to database...");

    const pago = new Pago(req.body);
    await pago.save();

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