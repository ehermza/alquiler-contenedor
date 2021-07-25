const mongo = require('mongoose');

mongo.connect('mongodb://localhost/alq-containers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(db => console.log('Db is connected.'))
    .catch(err => console.log(err));

module.exports = mongo;