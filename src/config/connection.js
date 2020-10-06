const mongoose = require('mongoose');
   
const uri = 'mongodb://mongo:27017/node_api';

const options = { useUnifiedTopology: true, useNewUrlParser: true }

mongoose.connect(uri, options).then(
  () => { console.log('Connected.') },
  err => { console.log('Error to connect to db.') }
);

module.exports = mongoose;