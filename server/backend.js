// npm i express mysql nodemon cors      -> Estas son la librerias necesarias para este node
// npm run devStart                      -> Esto corre en debug el server backend.js

// Importando librerias para usar en el servidor:

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require("dotenv").config();
const app = express();


// Metodos use para parsear y usar cors para fetchs

app.use(express.json())
app.use(cors());

// Establecemos los credenciales para establecer la conexion con mySQL:

const con = mysql.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
})



// Metodo app establecido para crear nuevos usuarios:

app.post("/usuarios", (req, res) => {

    // nombre_persona, correo, lugar, contrasena

    var today = new Date();
    let fecha_inicio = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const ultimo_log = fecha_inicio;
    const nombre = req.body.nombre_persona;
    const correo = req.body.correo;
    const clave = req.body.contrasena;
    const lugar = req.body.lugar;
    const id = req.body.id;

    con.connect(function (err) {

        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO usuarios VALUES(?,?,?,?,?,?,?)`, [id, nombre, correo, lugar, clave, lugar, ultimo_log],
            function (error, resultado) {
                console.log("Dato ingresado")
            }
        )
    })
})

app.post("/suscripciones", (req, res) => {

    // nombre_persona, correo, lugar, contrasena

    const id_suscripcion = req.body.id
    const id_usuario = req.body.id_usuario
    const id_plan = req.body.plan
    const valido_hasta = req.body.valido_hasta
    const fecha_inicio = req.body.fecha_inicio

    con.connect(function (err) {

        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO suscripciones VALUES(?,?,?,?,?)`, [id_suscripcion, id_usuario, id_plan, valido_hasta, fecha_inicio],
            function (error, resultado) {
                console.log("Dato ingresado")
            }
        )
    })
})

app.post("/retraerPlan", (req, res) => {
    const id_usuario = req.body.id_usuario;

    con.connect(function (err) {
        console.log("conectado")

        con.query(
            'SELECT id_plan FROM suscripciones WHERE id_usuario = ?',
            [id_usuario],
            (err, result) => {

                if (err) {
                    res.send({ err: err })
                }


                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({ message: "Combinacion de usuario y contrasena incorrectos!" })
                }
            }
        )
    })
})

app.post("/retraerPerfiles", (req, res) => {
    const id_usuario = req.body.id_usuario;

    con.connect(function (err) {
        console.log("conectado")

        con.query(
            'SELECT nombre FROM perfiles WHERE id_usuario = ? AND estatus = 1',
            [id_usuario],
            (err, result) => {

                if (err) {
                    res.send({ err: err })
                }


                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({ message: "Este usuario no tiene perfiles!" })
                }
            }
        )
    })
})

app.post("/quitarPerfil", (req, res) => {
    con.query(
        'DELETE FROM perfiles WHERE nombre = ?', [req.body.nombre_perfil],
        function (error, resultado) {
            console.log("Perfil eliminado")
        }
    )
})

app.post("/agregarPerfil", (req, res) => {

    // nombre_persona, correo, lugar, contrasena

    var today = new Date();
    let fecha = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const id = 'pe' + Math.floor(Math.random() * 100000);
    const id_usuario = req.body.id_usuario;
    const nombre = req.body.nombre;
    const fecha_creacion = fecha;
    const estatus = 1;

    con.connect(function (err) {

        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO perfiles VALUES(?,?,?,?,?)`, [id, id_usuario, nombre, fecha_creacion, estatus],
            function (error, resultado) {
                console.log("Dato ingresado")
            }
        )
    })
})

app.post("/retraerUsuarios", (req, res) => {
    const n = req.body.u_temp
    const c = req.body.c_temp
    con.query(
        `SELECT * FROM memflixdatabase.usuarios WHERE correo = ?`,
        [n],
        (err, result) => {

            console.log(result)

            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'Usuario o clave incorrectos' })
            }

        }
    )
})

app.post("/retraerAdmin", (req, res) => {
    const n = req.body.u_temp
    const c = req.body.c_temp
    con.query(
        `SELECT * FROM memflixdatabase.administradores WHERE correo = ?`,
        [n],
        (err, result) => {

            console.log(result)

            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'Usuario o clave incorrectos' })
            }

        }
    )
})

app.listen(3001, () => {
    console.log('App corriendo en el puerto 3001')
})