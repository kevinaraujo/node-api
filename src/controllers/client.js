module.exports = app => {
    
    app.get('/client/:id', (req, res) => {

        if (req.params.id != 1) {
            res.status(404).json({
                error: 'Client not found.'
            })
        }

        res.json({
            id: 1,
            name: 'Marcelo Silva',
            documentation: 12345678,
            gender: 'male',
            birthday: '1980/12/10'
        })
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
