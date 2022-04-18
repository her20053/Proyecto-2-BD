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

    const cuerpo = req.body

    con.connect(
        function (error) {
            con.query(
                `insert into peliculas (id_pelicula, titulo, resumen, url, duracion, fecha_estreno, rating, poster_path, backdrop_path)
                values (?,?,?,?,?,?,?,?,?)`,
                [cuerpo.idp, cuerpo.tit, cuerpo.rsm, cuerpo.url, cuerpo.drc, cuerpo.fce, cuerpo.rtg, cuerpo.psp, cuerpo.bdp],
                function (error_agregar, resultado) {
                    console.log("Pelicula ingresada con exito")
                }
            )
        }
    )

})

app.post('/admin_tools_modificar_pelicula', (req, res) => {

    const cuerpo = req.body

    if (cuerpo.area == 'titulo') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set titulo = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'resumen') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set resumen = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'url') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set url = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'duracion') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set duracion = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'fecha_estreno') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set fecha_estreno = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'rating') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set rating = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'poster_path') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set poster_path = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'backdrop_path') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set backdrop_path = ? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }

})

app.listen(PORT, () => {
    console.log(`App corriendo en http://localhost:${PORT}`)
})