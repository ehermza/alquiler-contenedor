const { Router } = require("express");
const Deuda = require("../models/Deuda");
const Ctdor = require("../models/Container");

const router = Router();

async function getTotal(ctdor) {
    const filter = { 'client': ctdor.rented_by_id };
    const deudas = await Deuda.find(filter);
    let total = 0;
    // console.log(filter);
    deudas.forEach(function(deuda) {
        total += parseInt(deuda.value);

    });
    console.log(`Deudas de ${ctdor.rented_by}: ${total}`);
}

async function ChargeDeuda(ctdor) {
    const values = {
        client: ctdor.rented_by_id,
        id_container: (ctdor.id_container),
        value: parseInt(ctdor.price_tocharge),
        period: 'Dto. mensual automat.',
    };
    const deuda = new Deuda(values);
    await deuda.save();
}

router.get('/deuda/charge', async function (req, res) {
    for (var idctdor = 1; idctdor <= 19; idctdor++) {
        const filter = { 'id_container': idctdor };
        const ctdores = await Ctdor.find(filter);
        if (!ctdores.length)
            continue;
        const container = ctdores[0];
        if (container.active) {
            ChargeDeuda(container);
            getTotal(container);
        }
    }
    res.redirect('/');
});

module.exports = router;