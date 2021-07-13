const { Router } = require("express");
const Container = require("../models/Container");
// const Pago = require("../models/Pago");

const router = Router();

router.get('/containers', async (req, res) => {
    // List all containers from database...
    const containers = await Container.find();
    res.render('containers', { containers: containers });
});

router.get('/containers/edit/:getid', async (req, res) => {
    // Get One Container to edit properties...
    const { getid } = req.params;
    const container = await Container.findById(getid);
    console.log("Edit container # " + req.params.id);
    res.render('profile', { container: container });
});

router.post('/containers/edit/:getid', async (req, res) => {
    // update the container to database.
    const { getid } = req.params;
    await Container.findByIdAndUpdate(getid, req.body);
    console.log("Update container # " + getid);

    res.redirect('/containers');
});

function validar_id(req) {
    const idctdor = req.body.id_container;
    // If id_container is Int; return true;
    if (idctdor.length != 0) {
        return (parseInt(idctdor) > 0);
    }
    return false;
}

function validar_client(req) {
    const client = req.body.rented_by;
    return (client != "");
}

function validar_price(req) {
    const price = req.body.price_tocharge;
    // If price value is Int; return true.
    if (price.length != 0) {
        return (parseInt(price) > 0);
    }
    return false;
}

router.post('/containers/add/', async (req, res) => {
    var habilitar = true;

    console.log("Adding a new client to database...");
    console.log(req.body);

    habilitar = validar_id(req);
    habilitar = (habilitar) ? validar_client(req) : false;
    habilitar = (habilitar) ? validar_price(req) : false;

    if (habilitar) {
        const ctdor = new Container(req.body);
        await ctdor.save();
    }
    res.redirect('/containers');
});

router.get('/containers/delete/:getid', async (req, res, next) => {
    // Deleted the selected Container by user. 
    const { getid } = req.params;
    const ctdor = await Container.findByIdAndDelete(getid);
    console.log(`Delete Container: /${getid}`);

    res.redirect('/containers');
});

module.exports = router;