const supertest = require('supertest')
const customExpress = require('../config/customExpress')

var app = customExpress()
var lastClientId = null

describe('Tests client endpoints.', () => {

    it('Tests a client insert route successfully', async () => {
      
        const data = {
            name: "Giovanna Sales",
            email: "giovanna.teste@gmail.com",
            documentation: "12345678",
            gender: "female",
            birthday: "09/05/1994"
        }

        const res = await supertest(app)
        .put('/client')
        .send(data)

        expect(res.status).toBe(201)

        lastClientId = res.body.insertId
    })

    it('Tests a client insert route with short name returns error', async () => {
        const data = {
            name: "Joao",
            email: "giovanna.teste@gmail.com",
            documentation: "12345678",
            gender: "female",
            birthday: "09/05/1994"
        }

        const res = await supertest(app)
        .put('/client')
        .send(data)
        
        expect(res.status).toBe(400)
    })

    it('Tests a client insert route with invalid birthday date returns error', async () => {1970
        const data = {
            name: "Joao Silva",
            email: "giovanna.teste@gmail.com",
            documentation: "12345678",
            gender: "female",
            birthday: "test"
        }

        const res = await supertest(app)
        .put('/client')
        .send(data)
        
        expect(res.status).toBe(400)
    })

    it('Tests a client get by id route successfully.', async () => {

        const res = await supertest(app).get(`/client/${lastClientId}`)

        expect(res.status).toBe(200)
        expect(res.body.name).toBe('Giovanna Sales')
        expect(res.body.documentation).toBe(12345678)
        expect(res.body.gender).toBe('female')
        expect(res.body.birthday).toBe('09/05/1994')
    })

    it('Tests a client update route successfully', async () => {
        const data = {
            name: "Lucas Silva"
        }

        const res = await supertest(app)
        .patch(`/client/${lastClientId}`)
        .send(data)

        expect(res.status).toBe(200)
        expect(res.body.affectedRows).toBe(1)
    })

    it('Testas a cliente update with invalid data return error', async () => {
        const data = {
            parent: "Marcelo Jr"
        }

        const res = await supertest(app)
        .patch(`/client/${lastClientId}`)
        .send(data)

        expect(res.status).toBe(400)
        expect(res.body.code).toBe('ER_BAD_FIELD_ERROR')
    })

    it('Tests a client get by id route not found.', async () => {
        const res = await supertest(app).get(`/client/9999999`)

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

    it('Tests a list of clients', async () => {
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