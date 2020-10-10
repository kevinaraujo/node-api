class Tables {

    init(connection) {
        this.connection = connection
        this.createClientTable()
    }

    createClientTable() {
        const sql = `CREATE TABLE IF NOT EXISTS clients (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            email varchar(50) NOT NULL,
            documentation int NOT NULL,
            birthday datetime NOT NULL,
            gender varchar(50) NOT NULL,
            created_at datetime NULL,
            PRIMARY KEY(id))`

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Table created successfully')
            }
        })
    }
}

module.exports = new Tables