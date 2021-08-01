const { Schema, model } = require('mongoose');

const pagoSchema = new Schema({
    client: { type: String, default: '_id: ObjectId(Client)' },
    value: { type: Number, required: true },
    month_paid: { type: String, default: '' },
    paid_at: { type: Date, default: Date.now() },
    recibo_n: { type: String, default: '000000' },
    id_container: Number,
});

module.exports = model('pago', pagoSchema);
