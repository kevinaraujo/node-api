const customExpress = require('./config/customExpress')
const connection = require('./config/connection')
const tables = require('./config/tables')

var app = customExpress()

connection.connect((err) => {
    if (err) {
        res.status(500).json({error: 'DB Connection' });
    } else {

        console.log('Connected to DB successfully.')
        tables.init(connection)
        app.listen(3000, () => { console.log('Server running on 3000 port.')}) 
    }
}) 

