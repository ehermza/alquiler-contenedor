/** @module Deuda */

const { Router } = require("express");
const Deuda = require("../models/Deuda");
const Ctdor = require("../models/Container");
const Client = require("../models/Client");

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
    return total;
}
/**
 * Insert to database the new debt by Id.Container
 * @param {Ctdor} ctdor Container class
 */
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

async function getIdClient(idctdor)
{
    const filter = {'id_container': idctdor};
    const arrayctdores=  await Ctdor.findOne(filter);
    
    return arrayctdores.rented_by_id;
}
/**
 * Charge new debt from All active Clients to database,
 * @name Cargar 
 * @api {GET} /deuda/charge
 */
router.get('/deuda/charge', async function (req, res) 
{
    for (var idctdor = 1; idctdor <= TOTAL_CONTAINERS; idctdor++) 
    {
        const filter = { 'id_container': idctdor };
        const ctdores = await Ctdor.find(filter);
        if (!ctdores.length)
            continue;
        const container = ctdores[0];

        if (!container.active)  
            continue;
        await ChargeDeuda(container);
        const totaldeudas = await getTotal(container);
        let idclient= await getIdClient(idctdor);
        console.log(`I want to charge deuda to: ${idclient}`);
        //
        const setvalue = {'deuda_total': totaldeudas};
        await Client.findByIdAndUpdate(idclient, setvalue);
    }
    res.redirect('/');
});

module.exports = router;