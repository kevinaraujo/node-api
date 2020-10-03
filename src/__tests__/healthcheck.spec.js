const supertest = require('supertest')
const customExpress = require('../config/customExpress')

var app = customExpress()

describe('Tests healthcheck endpoint.', () => {

    it("Tests the success response of api health.", async () => {
        
        const res = await supertest(app).get('/healthcheck')
        
        expect(res.status).toBe(200)
        expect(res.body).toEqual({ message: 'success' })
    })

})