const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    // id_Client: { type: String, requiered: true },
    name: { type: String, required: true },
    telephone: { type: String, default: 'undefined' },
    DNI: String,
    business: String,
    active: { type: Boolean, default: true },

});

module.exports = model('client', ClientSchema);
