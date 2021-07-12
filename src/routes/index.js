const { Router } = require("express");
// const Cliente = require("../models/Cliente");
const Container = require("../models/Container");
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

router.get('/delete-ctdor/:getid', async (req, res, next) => {
    // Deleted the selected Container by user. 
    const { getid } = req.params;
    const ctdor = await Container.findByIdAndDelete(getid);
    console.log(`Delete Container: /${getid}`);

    res.redirect('/containers');
});

router.get('/delete/:getid', async (req, res, next) => {
    const { getid } = req.params;
    const pago = await Pago.findByIdAndDelete(getid);
    console.log(`Delete pago: /${getid}`);

    res.redirect('/');
});

router.get('/containers', async (req, res) => {
    // Show all containers saved from database...
    const containers = await Container.find();
    res.render('containers', { containers: containers });
});

router.get('/containers/edit/:getid', async (req, res) => {
    // Get One Container to edit properties...
    const {getid} = req.params;
    const container = await Container.findById(getid);
    console.log("Edit container # "+ req.params.id);
    res.render('profile', { container: container });
});

router.post('/containers/edit/:getid', async (req, res) => {
    // update the container to database.
    const {getid} = req.params;
    await Container.findByIdAndUpdate(getid, req.body);
    console.log("Update container # "+ getid);

    res.redirect('/containers');
});

router.post('/add-client', async (req, res) => {
    var habilitar = false;
    console.log("Adding a new client to database...");
    console.log(req.body);

    const idctdor = req.body.id_container;
    if (idctdor.length != 0) {
        var ide= ((parseInt(idctdor) > 0) ? idctdor : null);
        if(!ide) 
            res.redirect('/containers');
        habilitar= true;
    }
    
    if (habilitar) {
        const ctdor = new Container(req.body);
        await ctdor.save();
    }

    res.redirect('/containers');
});

// router.get('/:getid', async(req, res,next) => {
//     const { getid } = req.params;
//     const pago = await Pago.findOne(getid);
//     console.log(`Get object: /${getid}`);

//     res.redirect('/');
// });

module.exports = router;