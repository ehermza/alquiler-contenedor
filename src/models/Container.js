const { model, Schema } = require('mongoose');

const ContainerSchema = new Schema({
    id_container: { type: Number, required: true },
    price_tocharge: { type: Number, required: true },
    rented_by: { type: String, required: true },
    rented_by_id: String,
    active: Boolean,
    // last_payment: Date,
    // date_init: Date,
    // date_finish: { type: Date, default: null }
});

module.exports = model('container', ContainerSchema);