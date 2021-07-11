const { Schema, model } = require('mongoose');

const cargaSchema = new Schema({
    client: { type: String, default: '@Nombre' },
    value: { type: Number, required:true },
    month_paid: String,
    paid_at: { type: Date, default: Date.now() },
    ticket: { type: String, default: '000000' },
});

module.exports = model('pago', cargaSchema);