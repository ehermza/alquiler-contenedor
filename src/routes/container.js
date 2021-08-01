//@ts-check
/** @module container */

const { Router } = require("express");
const Container = require("../models/Container");
const Client = require("../models/Client");

// const Pago = require("../models/Pago");

const router = Router();


/**
 *  Print a list of containers printing client name & price per month. Also has a FORM for agregate a new client, 
 * @name containers
 * @api {GET}  /containers
 */
router.get('/containers', async (req, res) => {
    // List all containers from database...
    const containers = await Container.find({ rented_by: { $ne: '' } });
    res.render('containers', { containers: containers, alert: '' });
});

/**
 *  Unlink a Client to Id-Container, this happens when the client left behind the rent.
 *  @name containers/unlink
 * @api {GET} /containers/unlink/:idcontainer
 */
router.get('/containers/unlink/:idcont', async function (req, res) {
    const { idcont } = req.params;
    await Container.findByIdAndUpdate(idcont, {
        rented_by: '',
        rented_by_id: '-1',
        active: false
    });
    res.redirect('/containers');
});

router.get('/containers/t/:id', async function (req, res) {
    const { id } = req.params;
    console.log(`get url id: ${id}`);
    var alert = "";
    if (id.indexOf('430') != -1) {
        alert = "Datos mal ingresados. Intenta de vuelta!"
    } else if (id.indexOf('310') != -1) {
        alert = "readonly";
    } else if (id.indexOf('259') != -1) {
        alert = "El Ctdor elegido ya se encuentra alquilado.";
    }
    console.log(`Alert: ${alert}`);
    
    // const containers = await Container.find();
    const containers = await Container.find({ rented_by: { $ne: '' } });
    res.render('containers', { containers: containers, alert: alert });
});

/**
 * Print info from id-container and personal info from the client
 * @name Container and Client Profile
 * @api {GET} /containers/edit/:id
 */
router.get('/containers/edit/:getid', async function (req, res) {    
    // Get One Container to edit properties...
    const { getid } = req.params;
    const container = await Container.findById(getid);

    // Get One Client to edit properties...
    const { rented_by_id } = container;
    const cliente = await Client.findById(rented_by_id);
    console.log(`Client: ${cliente}`);

    console.log("Edit container # " + getid);
    res.render('profile', { container: container, cliente: cliente });
});

/**
 * Send data to Server to Update personal info from client
 * @name Client Profile
 * @api {POST} /containers/edit/:id
 */
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
/**
 * 
 * @param {string} idctdor Id_Container
 * @returns boolean
 */
async function isCtdorBussy(idctdor) {
/**
 *   try to verify if the select container has client or not
 *   ehermza@github.com 
 */
    const filter = { 'id_container': parseInt(idctdor) };
    const ctdores = await Container.find(filter);
    const bool = ctdores.map(ctdor => ctdor.active);
    console.log(`OBJ. CONTENEDOR FROM MONGO: ${ctdores}`);
    console.log(`is Container Active: ${bool}`);
    return bool[0];
}
/**
 *  User try to add a new Container to database
 * @name Add Client
 * @api {POST} /containers/add
 * @bodyparam {String} id_container Id Container
 * @bodyparam {String} rented_by    Container's client Name
 * @bodyparam {Number} price_tocharge Price of container rent,
 */
router.post('/containers/add/', async (req, res) => {
    var habilitar = true;
    console.log("Adding a new ctdor to database...");
    // console.log(req.body);

    habilitar = validar_id(req);
    habilitar = (habilitar) ? validar_client(req) : false;
    habilitar = (habilitar) ? validar_price(req) : false;
    if (!habilitar) {
        res.redirect('/containers/t/430');
        return;
    }
    const { id_container } = req.body;
    if (await isCtdorBussy(id_container)) {
        // When the client try to add a container, will try to verify if the container exists 
        res.redirect('/containers/t/259');
        return;
    }
    /* Creando Cliente nuevo para agregarlo a base datos
            ehermza@github.com */
    const cliente = new Client();
    cliente.name = req.body.rented_by;
    await cliente.save();
    console.log(`Client properties: ${cliente}`)

    // const ctdor = new Container(req.body);   //deprecated!
    // await ctdor.save();
    // ctdor.rented_by_id = cliente._id;
    const filter = { id_container: id_container };
    const update = {
        price_tocharge: req.body.price_tocharge,
        rented_by: req.body.rented_by,
        rented_by_id: cliente._id,
        active: true,
    }
    const ctdor = await Container.findOneAndUpdate(filter, update);

    res.redirect('/containers');
});

/* router.get('/containers/delete/:getid', async (req, res, next) => {
    // Deleted the selected Container by user. 
    const { getid } = req.params;
    const ctdor = await Container.findByIdAndDelete(getid);
    console.log(`Delete Container: /${getid}`);

    res.redirect('/containers');
});
 */
module.exports = router;