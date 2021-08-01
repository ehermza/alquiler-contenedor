//@ts-check

const { Schema, model } = require('mongoose');
/**
 * Datos del cliente que alquila al menos un container.
 * @type {Schema}
 */
const ClientSchema = new Schema({
    name: { type: String, required: true },
    telephone: String,
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },
    deuda_total: { type: Number, default: 0 },
    pagos_total: { type: Number, default: 0 },
    rent_info: [
        {
            inicio: { type: Date, default: Date.now() },
            finish: Date,
            id_container: Number,
        }
    ]
});

module.exports = model('client', ClientSchema);
