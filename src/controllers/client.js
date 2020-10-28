const ClientModel = require('../models/Client')

module.exports = app => {

    app.put('/client', (req, res) => {
        ClientModel.add(req.body, res)
    })

    app.get('/clients', (req, res) => {

        const data = [{
            id: 1,
            name: 'Marcelo Silva',
            documentation: 12345678,
            gender: 'male',
            birthday: '1970/12/10'
        },
        {
            id: 2,
            name: 'Patrícia Silva',
            documentation: 102030,
            gender: 'female',
            birthday: '1980/05/09'
        },
        {
            id: 3,
            name: 'Juliano Brava',
            documentation: 90608070,
            gender: 'male',
            birthday: '1972/09/16'
        }]
        
        res.json(data)
    })

    app.get('/client/:id', (req, res) => {

        const id = parseInt(req.params.id)

        ClientModel.getById(id, res)
    })

    app.patch('/client/:id', (req, res) => {
        const id = parseInt(req.params.id)

        ClientModel.update(id, req.body, res)
    })

    app.delete('/client/:id', (req, res) => {
        const id = parseInt(req.params.id)

        ClientModel.delete(id, res)
    })

    app.get('/client/get_by_documentation/:documentation', (req, res) => {
        
        if (req.params.documentation != 12345678) {
            res.status(404).json({
                error: 'Client not found.'
            });
        }

        res.json({
            id: 1,
            name: 'Marcelo Silva',
            documentation: 12345678,
            gender: 'male',
            birthday: '1980/12/10'
        })
    });
}
