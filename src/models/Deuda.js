const { Schema, model } = require('mongoose');

const deudaSchema = new Schema({
    client: { type: String, default: '_id: ObjectId(Client)' },
    id_container: Number,
    value: { type: Number, required: true },
    period: { type: String, default: '' },
    // paid_at: { type: Date, default: Date.now() },
    // recibo_n: { type: String, default: '000000' },
});

module.exports = model('deuda', deudaSchema);
