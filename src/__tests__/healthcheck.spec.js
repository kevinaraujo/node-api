const supertest = require('supertest')
const customExpress = require('../config/customExpress')

var app = customExpress()

describe('Tests healthcheck endpoint.', () => {

    it("Tests the success response", async () => {
        
        const response = await supertest(app).get('/healthcheck')
        
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('success')
    })

})