const supertest = require('supertest')
const customExpress = require('../config/customExpress')

var app = customExpress()


describe('Tests client endpoints.', () => {

    it('Tests a creation of a client.', async () => {

        const response = await supertest(app).put('/client')

        expect(response.status).toBe(200)
    })
})