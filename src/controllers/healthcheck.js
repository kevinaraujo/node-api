module.exports = app => {
    app.get('/healthcheck', (req, res) => {
        
        res.json({ message: 'success' })       
    })
}