const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    // id_Client: { type: String, requiered: true },
    name: { type: String, required: true },
    telephone: { type: String, default: 'Ingresar' },
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
    deuda_total: { type: Number, default: 0 },
    pagos_total: { type: Number, default: 0 },
});

module.exports = model('client', ClientSchema);
