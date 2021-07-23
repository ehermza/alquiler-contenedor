const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    // id_Client: { type: String, requiered: true },
    name: { type: String, required: true },
    telephone: { type: String, default: 'Ingresar' },
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
    saldo_act: { type: Number, default: 0 },
});

module.exports = model('client', ClientSchema);
