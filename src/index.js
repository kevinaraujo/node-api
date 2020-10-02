const customExpress = require('./config/customExpress')

var app = customExpress()

app.listen(3000, () => { console.log('Server running on 3000 port.')})