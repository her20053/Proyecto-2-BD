const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const PORT = 3010

require("dotenv").config();
app.use(express.json())
app.use(cors());

const con = mysql.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
})

app.post('/admin_tools_agregar_pelicula', (req, res) => {

})

app.post('/admin_tools_modificar_pelicula', (req, res) => {
    // const id_usuario = req.body.id_usuario
    // const nombre_perfil = req.body.nombre_perfil
    con.query(
        `SELECT * FROM memflixdatabase.peliculas WHERE id_pelicula = ?`,
        [req.body.idp],
        (err, result) => {

            console.log(result)
            if (err) {
                res.send({ error: err })
            }
            res.send(result);


        }
    )
})



app.listen(PORT, () => {
    console.log(`App corriendo en http://localhost:${PORT}`)
})