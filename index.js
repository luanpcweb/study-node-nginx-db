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

    const conn = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values ('Luan')`
    conn.query(sql)
    conn.end()

    const conn1 = mysql.createConnection(config)
    var values = '<h1>Full Cycle Rocks!</h1>';
    
    conn1.connect(function(err) {
        if (err) throw err;
        
        conn1.query("SELECT * FROM people", function (err, result, fields) {
          
          if (err) throw err;

          Object.keys(result).forEach(function(key) {
                console.log(result[key].name);
                values += '- ' + result[key].name + ' <br>';
          });
          
          res.send(values)

        });
      });
   
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
