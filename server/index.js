const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')


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

app.delete("/api/delete/:idUs", (req, res) => {
    const id = req.params.idUs
    const sqlDelete = "DELETE FROM Artur.users WHERE id = ?"

    connection.query(sqlDelete, id, function (err, result) {
        if(err) {
            console.log(err.message);
        }
    })
})

app.put("/api/update", (req, res) => {
    const id = req.body.idUs
    const curses = req.body.cursesUs
    const sqlUpdate = "UPDATE Artur.users SET course = ? WHERE id = ?"

    connection.query(sqlUpdate, [curses, id], function (err, result) {
        if(err) {
            console.log(err.message);
        }
    })
})


app.listen(3006, () => {
    console.log('good')
})
