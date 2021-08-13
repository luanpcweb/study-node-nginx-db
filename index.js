const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

// create table people(id int not null auto_increment, name varchar(255), primary key(id));

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sqlCreate = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id));`
connection.query(sqlCreate)
connection.end()


app.get('/', (req, res) => {

    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values ('Luan')`
    connection.query(sql)

    var values = '<h1>Teste</h1>';
    connection.connect(function(err) {
        if (err) throw err;
        // if connection is successful
        con.query("SELECT * FROM students", function (err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          console.log(result);
          Object.keys(result).forEach(function(key) {
             values += '- ' + result[key] + '<br>';
          });
        });
    });

    connection.end()
    res.send(values)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
