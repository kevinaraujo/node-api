const connection = require('../config/connection')
const moment = require('moment')

class ClientModel {
  add(data, res) {

      const dtBirthday = moment(data.birthday)
      const created_at = new Date()
      const birthday = dtBirthday.format('YYYY-MM-DD') 
      const newData = {...data, created_at, birthday}

      const validations = [
        {
          name: 'name',
          valid: data.name.length >= 5,
          error: 'Name is too short.'
        },
        {
          name: 'birthday',
          valid: dtBirthday.isValid(),
          error: 'Birthday date is invalid.'          
        }
      ]

      const errors = validations.filter(field => !field.valid)
     
      if (errors.length) {
        res.status(400).json(errors)
        return 
      }
      
      const sql = `INSERT INTO clients SET ?`

      connection.query(sql, newData, (err, response) => {

          if (err) {
            res.status(400).json(err)
            return
          }
            
          res.status(201).json(response)
          return           
      })
  }    
}

module.exports = new ClientModel