const connection = require('../config/connection')
const moment = require('moment')

class ClientModel {
  add(data) {
      const created_at = new Date()
      const birthday = moment(data.birthday).format('YYYY-MM-DD') 
      const newData = {...data, created_at, birthday}

      const sql = `INSERT INTO clients SET ?`

      connection.query(sql, newData, (err, response) => {
          if (err) {
            console.log(err)
          } else {
            console.log(response) 
          }
      })
  }    
}

module.exports = new ClientModel