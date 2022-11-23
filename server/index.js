const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
// const { v4: uuidv4 } = require('uuid')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cinema1991",
    database: "Artur",
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
app.post("/api/insert", (req, res) => {

    const usId = req.body.usId
    const usName = req.body.usName
    const usCourse = req.body.usCourse

    const sqlInsert = "INSERT INTO users (id, name, course) VALUES (?, ?, ?)"

    connection.query(sqlInsert, [usId ,usName, usCourse],function (err, result) {
        if (err) {
            console.log('error' + err.message);
        }else{
            console.log('students Add');
            console.log(result);
            res.send('hello Artur')
        }
    
    })
})

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM users"
    connection.query(sqlSelect, function (err, result) {
        if(err) {
            console.log('error' + err.message)
        }else {
            res.send(result)
        }
    })
})

// const sql = "SELECT * FROM users";
// connection.query(sql, function (err, result) {
//     if (err) {
//         console.log('error' + err.message);
//     }else{
//         console.log(result);
//     }
// });



// const sql = "DELETE FROM users WHERE id = 2";
// connection.query(sql, function (err, result) {
//   console.log(result);
// });


app.listen(3006, () => {
    console.log('good')
})
