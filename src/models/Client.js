const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    idClient: { type: String, requiered: true },
    name: { type: String, required: true },
    telephone: { type: String, default: 'undefined' },
    DNI: String,
    business: String,

});

module.exports = model('client', ClientSchema);
