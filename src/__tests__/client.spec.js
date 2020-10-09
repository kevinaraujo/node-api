const supertest = require('supertest')
const customExpress = require('../config/customExpress')

var app = customExpress()

describe('Tests client endpoints.', () => {

    it('Tests a client found by its id.', async () => {

        const res = await supertest(app).get(`/client/1`)

        expect(res.status).toBe(200)
        expect(res.body.name).toBe('Marcelo Silva')
        expect(res.body.documentation).toBe(12345678)
        expect(res.body.gender).toBe('male')
        expect(res.body.birthday).toBe('1970/12/10')
    })

    it('Tests a client not found by its id.', async () => {
        const res = await supertest(app).get('/client/20')

        expect(res.status).toBe(404)
        expect(res.body).toEqual({
            error: 'Client not found.'
        })
    })

    it('Tests a client found by its documentation.', async () => {

        const res = await supertest(app).get('/client/get_by_documentation/12345678')

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            id: 1,
            name: 'Marcelo Silva',
            documentation: 12345678,
            gender: 'male',
            birthday: '1980/12/10'
        })
    })

    it('Tests a client not found its documentation.', async () => {
        
        const res = await supertest(app).get('/client/get_by_documentation/1232010')

        expect(res.status).toBe(404)    
        expect(res.body).toEqual({
            error: 'Client not found.'
        })
    })

    it('Tests a list of clients', async() => {
        const res = await supertest(app).get('/clients')

        
        expect(res.status).toBe(200)
        expect(res.body.length).toEqual(3)

        res.body.map(client => {
            expect(client).toHaveProperty('name')
            expect(client).toHaveProperty('documentation')
            expect(client).toHaveProperty('gender')
            expect(client).toHaveProperty('birthday')
        })
    })
})