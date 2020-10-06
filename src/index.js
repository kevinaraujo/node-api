const customExpress = require('./config/customExpress')
const mongoose = require('./config/connection')

mongoose.connection.on('error', function (err) {
    console.log('Error to connect to DB.')
    return
});

var app = customExpress()

app.listen(3000, () => { console.log('Server running on 3000 port.')})