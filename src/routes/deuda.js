const { Router } = require("express");
const Deuda = require("../models/Deuda");
const Ctdor = require("../models/Container");

const router = Router();

async function ChargeDeuda(ctdor) 
{
    const values = {
        client: ctdor.rented_by_id,
        id_container:  (ctdor.id_container),
        value: parseInt(ctdor.price_tocharge),
        period: 'Dto. mensual automat. Llenar',
    };
    const deuda = new Deuda(values);
    await deuda.save();
}

router.get('/deuda/charge', async function (req, res) 
{
    for (var idctdor = 1; idctdor < 19; idctdor++) {
        const filter = { 'id_container': idctdor };
        const ctdores = await Ctdor.find(filter);
        if (!ctdores.length)
            continue;
        const container = ctdores[0];
        if (container.active) {
            ChargeDeuda(container);
        }
    }
    res.redirect('/');
});

module.exports = router;