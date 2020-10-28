const connection = require('../config/connection')
const moment = require('moment')

class ClientModel {
  add(data, res) {

      const dtBirthday = moment(data.birthday, 'DD/MM/YYYY')
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

  getById(id, res) {
    const sql = `SELECT * FROM clients where id = ${id}`

    connection.query(sql, (err, data) => {     

      if (!data.length) {
        res.status(404).json({
            error: 'Client not found.'
        })
        return
      }

      let client = JSON.parse(JSON.stringify(data[0]))     
      const dtBirthday = moment(client.birthday)
      
      client.birthday = dtBirthday.format('DD/MM/YYYY')

      if (err) {
        res.status(400).json(err)
        return
      }

      res.status(200).json(client)
    })
  }

  update(id, data, res) {
    const sql = "UPDATE clients SET ? WHERE id=?"

    connection.query(sql, [data, id], (err, response) => {
      if (err) {
        res.status(400).json(err)
        return
      }
      
      res.status(200).json(response)
    })
  }
}

module.exports = new ClientModel