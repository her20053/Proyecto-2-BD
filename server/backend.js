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

app.post("/alterar_plan_suscripciones", (req, res) => {

    // nombre_persona, correo, lugar, contrasena

    const id_usuario = req.body.id_usuario
    const id_plan = req.body.id_plan

    // update suscripciones
    // set id_plan = 'pl3'
    // where id_usuario = 'u33665';

    con.connect(function (err) {

        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `UPDATE suscripciones SET id_plan = ? WHERE id_usuario = ?`, [id_plan, id_usuario],
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
                res.send(id);
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

app.post("/agregarFallido", (req, res) => {
    const n = req.body.u_temp
    const id = 'if' + Math.floor(Math.random() * 100000);
    con.query(
        `INSERT INTO intentos_fallidos VALUES(?, ?, NOW())`, [id, n],
        function (error, resultado) {
            console.log("Dato ingresado")
        }
    )
})

app.post("/modLogin", (req, res) => {
    const id = req.body.id
    con.query(
        `update usuarios set ultimo_login = NOW() where id_usuario = ?`, [id],
        function (error, resultado) {
            console.log("Dato ingresado")
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

app.get("/retraerPelis", (req, res) => {
    con.query('SELECT * FROM peliculas',
        (err, result) => {
            res.send(result);
        })
})

app.post("/sendWatched", (req, res) => {
    const peli = req.body.id_pelicula
    const id = req.body.id_perfil
    con.query(
        `INSERT INTO peliculas_vistas VALUES(?,?,NOW())`,
        [id, peli],
        function (error, resultado) {
            console.log("Pelicula vista ingresada")
        }
    )
})

app.post("/sendFavorites", (req, res) => {
    const peli = req.body.id_pelicula
    const id = req.body.id_perfil
    con.query(
        `INSERT INTO favoritos VALUES(?,?)`,
        [id, peli],
        function (error, resultado) {
            console.log("Pelicula favorita ingresada")
        }
    )
})

app.post("/retraerIdPerfil", (req, res) => {
    const id_usuario = req.body.id_usuario
    const nombre_perfil = req.body.nombre_perfil
    con.query(
        `SELECT id_perfil FROM perfiles WHERE id_usuario= ? AND nombre =?`,
        [id_usuario, nombre_perfil],
        (err, result) => {

            console.log(result)

            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'No existe este perfil' })
            }

        }
    )
})
app.post("/retraerpeli", (req, res) => {
    const id_peli = req.body.id_pelicula
    con.query(
        `SELECT * FROM peliculas WHERE id_pelicula=?`, [id_peli],
        (err, result) => {
            console.log(result)
            console.log(id_peli)
            if (err) {
                console.log("Hubo un error")
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'No existe una pelicula con ese id' })
            }
        }
    )
})

app.post("/retraerWatched", (req, res) => {
    const id_perfil = req.body.id_perfil
    con.query(
        `Select distinct memflixdatabase.p.id_pelicula,memflixdatabase.p.titulo,memflixdatabase.p.resumen,memflixdatabase.p.url,memflixdatabase.p.duracion,memflixdatabase.p.fecha_estreno,memflixdatabase.p.rating,memflixdatabase.p.poster_path,memflixdatabase.p.backdrop_path from memflixdatabase.peliculas p 
        join memflixdatabase.peliculas_vistas vs on (p.id_pelicula = vs.id_pelicula)
        where vs.id_perfil = ?`,
        [id_perfil],
        (err, result) => {

            console.log(result)

            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'No hay peliculas vistas' })
            }

        }
    )
})

app.post("/retraerFavorites", (req, res) => {
    const id_perfil = req.body.id_perfil
    con.query(
        `select distinct * from peliculas p join favoritos f on (p.id_pelicula = f.id_pelicula) where f.id_perfil = ?`,
        [id_perfil],
        (err, result) => {

            console.log(result)

            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'No hay peliculas vistas' })
            }

        }
    )
})

app.post("/retraerpelisearch", (req, res) => {
    const input = req.body.dato_ingresado
    con.query(
        `Select distinct memflixdatabase.p.id_pelicula,memflixdatabase.p.titulo,memflixdatabase.p.resumen,memflixdatabase.p.url,memflixdatabase.p.duracion,memflixdatabase.p.fecha_estreno,memflixdatabase.p.rating,memflixdatabase.p.poster_path,memflixdatabase.p.backdrop_path from memflixdatabase.peliculas p 
        join memflixdatabase.premios_pelicula p_p on (p.id_pelicula = p_p.id_pelicula)
        join memflixdatabase.premios pre on(p_p.id_premio=pre.id_premio)
        join memflixdatabase.directores dr on(p.id_pelicula=dr.id_pelicula)
        join memflixdatabase.actores_pelicula ac on(p.id_pelicula=ac.id_pelicula)
        join memflixdatabase.actores a on(ac.id_actor=a.id_actor)
        where p.titulo=? or pre.nombre_premio=? or dr.nombre=? or a.nombre=?`,
        [input, input, input, input],
        (err, result) => {

            console.log(result)

            if (err) {
                res.send({ error: err })
            }
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ mensaje_error: 'No hay peliculas vistas' })
            }

        }
    )
})


app.get("/retraerAnuncios", (req, res) => {
    console.log("Se estan retrayendo anunciantes")
    con.query('SELECT * FROM anunciante',
        (err, result) => {
            res.send(result);
        })
})


app.post('/retraer_perfiles_de_usuario', (req, res) => {

    console.log("Se estan retrayendo todos los perfiles de un usuario especifico")

    const id_usuario_temp = req.body.id_usuario_temp

    console.log(`SELECT * FROM perfiles WHERE id_usuario = ?`, [id_usuario_temp]);

    con.query(
        `SELECT * FROM perfiles WHERE id_usuario = ?`, [id_usuario_temp],
        (posible_error, resultado_query) => {
            console.log(resultado_query);
            res.send(resultado_query)
        }
    )

})







app.listen(3001, () => {
    console.log('App corriendo en el puerto 3001')
})