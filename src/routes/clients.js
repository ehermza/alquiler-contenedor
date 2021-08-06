const { Router } = require('express');
const Client = require("../models/Client");

const router = Router();

router.post('/clients/edit/:idclient', async function (req, res) {
    const { idclient } = req.params;
    // console.log(`Cliente: ${req.body}`)
    const cliente = await Client.findByIdAndUpdate(idclient, req.body);

    console.log("Update the client to database...");
    res.redirect('/containers');
});
/*
    router.get('/verpagos/edit/:idclient', async (req, res) => {
    // Show data person of one client.
    const { idclient } = req.params;
    const cliente = await Client.find({ _id: idclient });
    res.render('profile', { container: container });
});
*/

module.exports = router;