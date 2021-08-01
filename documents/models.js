const { Schema, model } = require('mongoose');

const pagoSchema = new Schema({
    client: { type: String, default: '@Nombre' },
    value: { type: Number, required: true },
    month_paid: { type: String, default: '' },
    paid_at: { type: Date, default: Date.now() },
    recibo_n: { type: String, default: '000000' },
    id_container: Number,
});
module.exports = model('pago', pagoSchema);


const deudaSchema = new Schema({
    client: { type: String, default: '@Nombre' },
    id_container: Number,
    value: { type: Number, required: true },
    period: { type: String, default: '' },
});
module.exports = model('deuda', deudaSchema);

const ClientSchema = new Schema({
    name: { type: String, required: true },
    telephone: { type: String, default: 'Ingresar' },
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
    deuda_total: { type: Number, default: 0 },
    pagos_total: { type: Number, default: 0 },
});
module.exports = model('client', ClientSchema);

const ContainerSchema = new Schema({
    id_container: { type: Number, unique: true, required: true, },
    price_tocharge: { type: Number, required: true },
    rented_by: { type: String, required: true },
    rented_by_id: String,
    active: Boolean,
});
module.exports = model('container', ContainerSchema);
