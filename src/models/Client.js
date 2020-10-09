const connection = require('../config/connection')

class ClientModel {
  add(data) {
      const sql = `INSERT INTO clients SET ?`

      connection.query(sql, data, (err, response) => {
          if (err) {
            console.log(err)
          } else {
            console.log(response) 
          }
      })
  }    
}

module.exports = new ClientModel