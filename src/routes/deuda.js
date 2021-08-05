/** @module Deuda */

require("dotenv").config();

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
    deudas.forEach(function (deuda) {
        total += parseInt(deuda.value);

    });
    console.log(`Deudas de ${ctdor.rented_by}: ${total}`);
    return total;
}
/**
 * Insert to database the new debt by Id.Container
 * @param {Ctdor} ctdor Container class
 */
async function ChargeDeuda(ctdor, strper) {
    const values = {
        client: ctdor.rented_by_id,
        id_container: (ctdor.id_container),
        value: parseInt(ctdor.price_tocharge),
        period: strper
    };
    const deuda = new Deuda(values);
    await deuda.save();
}

async function getIdClient(idctdor) {
    const filter = { 'id_container': idctdor };
    const arrayctdores = await Ctdor.findOne(filter);

    return arrayctdores.rented_by_id;
}
/**
 * Charge new debt from All active Clients to database,
 * @name Cargar 
 */
/**
 * Get request from views/index.ejs. when user press 'NUEVO PERIODO' button<br>
 *  then execute a for loop checking if container is active,
 *  If is true, then query to database for the month value to pay,
 *  and insert the value to 'Deuda' table from database, 
 *  Later, find all debts from every Client  and calculate total debts
 *   for update the value: Client.deuda_total from database.
 * @name ChargeDeuda
 * @api {GET} /deuda/charge
 */

router.get('/deuda/charge', async function (req, res) 
{
    const { per } = req.query;
    const totalct = process.env.TOTAL_CONTAINERS;
    console.log(`PERIODO: ${per}`);
    
    for (var idctdor = 1; idctdor <= totalct; idctdor++) 
    {
        const filter = { 'id_container': idctdor };
        const ctdores = await Ctdor.find(filter);
        if (!ctdores.length)
            continue;
        const container = ctdores[0];

        if (!container.active)
            continue;

        await ChargeDeuda(container, per);
        const totaldeudas = await getTotal(container);
        let idclient = await getIdClient(idctdor);
        console.log(`I want to charge deuda to: ${idclient}`);
        //
        const setvalue = { 'deuda_total': totaldeudas };
        await Client.findByIdAndUpdate(idclient, setvalue);
    }
    res.redirect('/');
});

module.exports = router;