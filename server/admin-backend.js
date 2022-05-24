const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs')

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
app.post("/admin_agregar_usuario", (req, res) => {

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
                console.log("Se ingreso el usuario con exito")
            }
        )
    })
})

app.post('/admin_agregar_anunciante', (req, res) => {
    const id_anunciante = 'an' + Math.floor(Math.random() * 100000);
    const nombre = req.body.nombre
    const mensaje = req.body.mensaje
    con.query(
        `INSERT INTO memflixdatabase.anunciante VALUES(?,?,?)`,
        [id_anunciante, nombre, mensaje],
        function (err, result) {
            console.log("Anunciante ingreado con exito")
        }

    )
})
app.post('/admin_eliminar_anunciante', (req, res) => {
    const id_anunciante = req.body.id_anunciante
    con.query(
        `DELETE FROM memflixdatabase.anunciante an where an.id_anunciante=?`,
        [id_anunciante],
        function (err, result) {
            console.log("Se elimino anunciante con exito")
        }
    )
})

app.post('/admin_tools_modificar_usuario', (req, res) => {


    const cuerpo = req.body
    console.log(cuerpo.area)
    if (cuerpo.area == 'correo') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update usuarios set correo = ? WHERE id_usuario = ?`,
                    [cuerpo.nuevovalor, cuerpo.idu],
                    function (error_agregar, resultado) {
                        console.log("Usuario modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'nombre') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update usuarios set nombre_persona = ? WHERE id_usuario = ?`,
                    [cuerpo.nuevovalor, cuerpo.idu],
                    function (error_agregar, resultado) {
                        console.log("Usuario modificada con exito nombre")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'contrasena') {
        let contrasena = bcrypt.hashSync(cuerpo.nuevovalor, bcrypt.genSaltSync());
        con.connect(
            function (error, resultados) {
                con.query(
                    `update usuarios set contrasena = ? WHERE id_usuario = ?`,
                    [contrasena, cuerpo.idu],
                    function (error_agregar, resultado) {
                        console.log("Usuario modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }

})

app.get("/retraerTopGeneros", (req, res) => {
    con.query('SELECT g.nombre_genero,sum(p.duracion) as duracion from generos g join generos_pelicula gp on(g.id_genero=gp.id_genero) join peliculas p on(gp.id_pelicula=p.id_pelicula) join peliculas_vistas pv on(p.id_pelicula=pv.id_pelicula) GROUP BY g.nombre_genero ORDER BY duracion DESC LIMIT 7',
        (err, result) => {
            res.send(result);
        })
})

app.get("/retraerCantidad", (req, res) => {
    con.query('SELECT g.nombre_genero, count(pv.id_pelicula) as reproducciones, s.id_plan from generos g join generos_pelicula gp on(g.id_genero = gp.id_genero) join peliculas p on(gp.id_pelicula = p.id_pelicula) join peliculas_vistas pv on(p.id_pelicula = pv.id_pelicula) join perfiles p2 on(pv.id_perfil = p2.id_perfil) join suscripciones s on(p2.id_usuario = s.id_usuario) GROUP BY g.nombre_genero, s.id_plan, g.nombre_genero ORDER BY reproducciones DESC LIMIT 10',
        (err, result) => {
            res.send(result);
        })
})

app.get("/retraerActores", (req, res) => {
    con.query(`SELECT ac.nombre,count(pv.id_pelicula) as reproducciones,s.id_plan
    FROM actores ac
    join actores_pelicula ap on ac.id_actor = ap.id_actor
    join peliculas p on ap.id_pelicula = p.id_pelicula
    join peliculas_vistas pv on p.id_pelicula = pv.id_pelicula
    join perfiles p2 on pv.id_perfil = p2.id_perfil
    join suscripciones s on p2.id_usuario = s.id_usuario
    where s.id_plan='pl2' or s.id_plan='pl3'
    GROUP BY ac.nombre, s.id_plan
    ORDER BY reproducciones DESC limit 10`,
        (err, result) => {
            res.send(result);
        })
})

app.get("/retraerDirectores", (req, res) => {
    con.query(`SELECT di.nombre,count(pv.id_pelicula) as reproducciones,s.id_plan
    FROM directores di
    join peliculas p on di.id_pelicula = p.id_pelicula
    join peliculas_vistas pv on p.id_pelicula = pv.id_pelicula
    join perfiles p2 on pv.id_perfil = p2.id_perfil
    join suscripciones s on p2.id_usuario = s.id_usuario
    where s.id_plan='pl2' or s.id_plan='pl3'
    GROUP BY di.nombre, s.id_plan
    ORDER BY reproducciones DESC limit 10`,
        (err, result) => {
            res.send(result);
        })
})
app.get("/retraerCuentaAvanzada", (req, res) => {
    con.query(`SELECT count(id_plan) as cuentavanzada
    from suscripciones s
    where s.fecha_inicio between '2021-10-18' and '2022-04-18' and s.id_plan='pl3'`,
        (err, result) => {
            res.send(result);
        })
})
app.post('/actualizarstatus',(req,res)=>{
    const id_perfil=req.body.id_perfil
    con.query(`update perfiles set estatus = 0 WHERE id_perfil = ?`,
    [id_perfil],
    function (error_agregar, resultado) {
        console.log("estatus modificado con exito")
    })
})
app.post('/actualizarstatus1',(req,res)=>{
    const id_perfil=req.body.id_perfil
    con.query(`update perfiles set estatus = 1 WHERE id_perfil = ?`,
    [id_perfil],
    function (error_agregar, resultado) {
        console.log("estatus modificado con exito")
    })
})

app.post('/ingresaradmin',(req,res) => {
    const idadmin =req.id_admin
    const nombre = req.nombre
    const correo = req.correo
    const lugar_creacion = req.lugar_creacion
    const contrasena = req.contrasena
    const ultimo_login = req.ultimo_log
    con.query(`Insert into administradores values(?,?,?,?,?,?)`,[idadmin,nombre,correo,lugar_creacion,contrasena,ultimo_login]),
    function(error_agregar,resultado){
        console.log("Datos ingresados con exito")
    }
    
})

app.listen(PORT, () => {
    console.log(`App corriendo en http://localhost:${PORT}`)
})