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
                `insert into peliculas (id_pelicula, titulo, resumen, url, duracion, fecha_estreno, rating, poster_path, backdrop_path, id_administrador)
                values (?,?,?,?,?,?,?,?,?,?)`,
                [cuerpo.idp, cuerpo.tit, cuerpo.rsm, cuerpo.url, cuerpo.drc, cuerpo.fce, cuerpo.rtg, cuerpo.psp, cuerpo.bdp, cuerpo.id_admin],
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
        console.log(cuerpo.id_admin)
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set titulo = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
                    function (error_agregar, resultado) {
                        console.log("Pelicula modificada con exito")
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'resumen') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update peliculas set resumen = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
                    `update peliculas set url = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
                    `update peliculas set duracion = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
                    `update peliculas set fecha_estreno = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
                    `update peliculas set rating = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
                    `update peliculas set poster_path = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
                    `update peliculas set backdrop_path = ?, id_administrador=? WHERE id_pelicula = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idp],
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
    const lugar1 = req.body.lugar;
    const lugar2 = req.body.lugar;
    const id = req.body.id;
    const id_admin = req.body.id_admin;

    const id_suscripcion = req.body.id_susc
    const id_planes = req.body.id_plan
    let valido_hasta = (today.getFullYear() + 1) + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let fecha_inicio2 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    con.connect(function (err) {
        console.log(`INSERT INTO suscripciones VALUES(?,?,?,?,?)`, [id_suscripcion, id, id_planes, valido_hasta, fecha_inicio2])
        console.log(`INSERT INTO usuarios VALUES(?,?,?,?,?,?,?,?)`, [id, nombre, correo, lugar1, clave, lugar2, ultimo_log, id_admin])
        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO usuarios VALUES(?,?,?,?,?,?,?,?)`, [id, nombre, correo, lugar1, clave, lugar2, ultimo_log, id_admin],
            function (error, resultado) {
                console.log("Se ingreso el usuario con exito")
            }
        )

         con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO suscripciones VALUES(?,?,?,?,?)`, [id_suscripcion, id, id_planes, valido_hasta, fecha_inicio2],
            function (error, resultado) {
                console.log("Se ingreso el plan con exito")
            }
        )
    })
})

app.post("/admin_agregar_actor", (req, res) => {

    const id = req.body.id
    const nombre = req.body.nombre_persona;
    const edad = parseInt(req.body.edadAc)
    const genero = req.body.generoAc
    const id_admin = req.body.id_admin;

    con.connect(function (err) {
        console.log(`INSERT INTO actores VALUES(?,?,?,?,?)`, [id, nombre, genero, edad, id_admin])
        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO actores VALUES(?,?,?,?,?)`, [id, nombre, genero, edad ,id_admin],
            function (error, resultado) {
                console.log("Se ingreso el actor con exito")
            }
        )
    })
})

app.post("/admin_agregar_perfil", (req, res) => {

    var today = new Date()
    const id = req.body.id
    const nombre = req.body.nombre_persona;
    const id_usuario = req.body.id_usuario
    const estatus = req.body.estatusP
    const id_admin = req.body.id_admin
    let fecha_inicio = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    con.connect(function (err) {
        // console.log(`INSERT INTO actores VALUES(?,?,?,?,?)`, [id, nombre, genero, edad, id_admin])
        console.log("Conectado")

        con.query(
            // 'INSERT INTO pruebausuarios VALUES("PERRO","123")',
            `INSERT INTO perfiles VALUES(?,?,?,?,?,?)`, [id, id_usuario, nombre, fecha_inicio, estatus, id_admin],
            function (error, resultado) {
                console.log("Se ingreso el perfil con exito")
            }
        )
    })
})

app.post('/admin_agregar_anunciante', (req, res) => {
    const id_anunciante = 'an' + Math.floor(Math.random() * 100000);
    const nombre = req.body.nombre
    const mensaje = req.body.mensaje
    const id_admin = req.body.admin
    con.query(
        `INSERT INTO memflixdatabase.anunciante VALUES(?,?,?,?)`,
        [id_anunciante, nombre, mensaje, id_admin],
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

app.post('/admin_eliminar_pelicula', (req, res) => {
    const id_pelicula = req.body.id_pelicula
    con.query(
        `DELETE FROM memflixdatabase.peliculas an where an.id_pelicula=?`,
        [id_pelicula],
        function (err, result) {
            console.log("Se elimino pelicula con exito")
        }
    )
})

app.post('/admin_eliminar_actor', (req, res) => {
    const id_actor = req.body.id_actor
    con.query(
        `DELETE FROM memflixdatabase.actores an where an.id_actor=?`,
        [id_actor],
        function (err, result) {
            console.log("Se elimino actor con exito")
        }
    )
})

app.post('/admin_eliminar_perfil', (req, res) => {
    const id_perfil = req.body.id_perfil
    con.query(
        `DELETE FROM memflixdatabase.perfiles an where an.id_perfil=?`,
        [id_perfil],
        function (err, result) {
            console.log("Se elimino perfil con exito")
        }
    )
})

app.post('/admin_eliminar_usuario', (req, res) => {
    const id_usuario = req.body.id_usuario
    con.query(
        `DELETE FROM memflixdatabase.usuarios an where an.id_usuario=?`,
        [id_usuario],
        function (err, result) {
            console.log("Se elimino usuario con exito")
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
                    `update usuarios set correo = ?, id_administrador = ? WHERE id_usuario = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idu],
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
                    `update usuarios set nombre_persona = ?, id_administrador = ? WHERE id_usuario = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.idu],
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
                    `update usuarios set contrasena = ?, id_administrador = ? WHERE id_usuario = ?`,
                    [contrasena, cuerpo.id_admin, cuerpo.idu],
                    function (error_agregar, resultado) {
                        console.log("Usuario modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }

})

app.post('/admin_tools_modificar_actor', (req, res) => {


    const cuerpo = req.body
    console.log(cuerpo.area)
    if (cuerpo.area == 'nombre') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update actores set nombre = ?, id_administrador = ? WHERE id_actor = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.ida],
                    function (error_agregar, resultado) {
                        console.log("Actor modificada con exito")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'genero') {
        con.connect(
            function (error, resultados) {
                con.query(
                    `update actores set genero = ?, id_administrador = ? WHERE id_actor = ?`,
                    [cuerpo.nuevovalor, cuerpo.id_admin, cuerpo.ida],
                    function (error_agregar, resultado) {
                        console.log("Actor modificada con exito nombre")
                        console.log(resultados)
                    }
                )
            }
        )
    }
    if (cuerpo.area == 'edad') {
        let contrasena = bcrypt.hashSync(cuerpo.nuevovalor, bcrypt.genSaltSync());
        con.connect(
            function (error, resultados) {
                con.query(
                    `update actores set edad = ?, id_administrador = ? WHERE id_actor = ?`,
                    [contrasena, cuerpo.id_admin, cuerpo.ida],
                    function (error_agregar, resultado) {
                        console.log("Actor modificada con exito")
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

app.get("/retraerBusquedas", (req, res) => {
    con.query('SELECT * FROM topBusquedas',
        (err, result) => {
            res.send(result);
        })
})

app.post("/retraerAdmins", (req, res) => {

    con.query('Select * from topAdmins where fecha_modificacion between ? and ? limit 5', [req.body.fInicial, req.body.fFinal],
        (err, result) => {
            res.send(result);
        })
})

app.post("/retraerTerminar", (req, res) => {
    console.log('select * from topSinTerminar where CAST(? AS DATE) - CAST(? AS DATE) >= 20 limit 20', [ req.body.fFinal, req.body.fInicial])
    con.query('select * from topSinTerminar where CAST(? AS DATE) - CAST(? AS DATE) >= 20 limit 20', [ req.body.fFinal, req.body.fInicial],
        (err, result) => {
            res.send(result);
        })
})

app.get("/retraerBitacora", (req, res) => {
    con.query('SELECT * FROM bitacora',
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
app.post('/actualizarstatus', (req, res) => {

     const id_perfil = req.body.id_perfil
    const id_administrador=req.body.id_admin

    con.query(`update perfiles set estatus = 0, id_administrador=? WHERE id_perfil = ?`,
        [id_administrador, id_perfil],
        function (error_agregar, resultado) {
            console.log("estatus modificado con exito")
        })
})
app.post('/actualizarstatus1', (req, res) => {
    const id_perfil = req.body.id_perfil
    const id_administrador = req.body.id_admin
    con.query(`update perfiles set estatus = 1, id_administrador=? WHERE id_perfil = ?`,
        [id_administrador, id_perfil],
        function (error_agregar, resultado) {
            console.log("estatus modificado con exito")
        })
})

app.post('/pruebaInsert', (req, res) => {
    console.log('hola')
    const idadmin = req.body.id_admin
    const nombre = req.body.nombre_admin
    const correo = req.body.correo_admin
    const lugar_creacion = req.body.lugar_admin
    const contrasena = req.body.contrasena_admin
    console.log(req)
    console.log(`insert into administradores values(?,?,?,?,?,NOW())`, [idadmin, nombre, correo, lugar_creacion, contrasena])
    con.query(`insert into administradores values(?,?,?,?,?,NOW())`, [idadmin, nombre, correo, lugar_creacion, contrasena],
        function (error_agregar, resultado) {
            console.log("Datos ingresados con exito")
        })
})



app.get('/retraerTodosPerfiles', (req, res) => {
    console.log('\n[Operacion /retraerTodosPerfiles] + Se han enviado todos los perfiles retraidos.\n');
    con.query(`select * from perfiles`,
        (err, result) => {
            res.send(result);
        })
})

app.get('/retraerTodasPeliculas', (req, res) => {
    console.log('\n[Operacion /retraerTodasPeliculas] + Se han enviado todas las peliculas retraidas.\n');
    con.query(`select * from peliculas`,
        (err, result) => {
            res.send(result);
        })
})

app.post('/insertarSimulacionVisitas', (req, res) => {
    // insert into peliculas_vistas values('pe57487', 'pe0552', cast('2022-04-21' as date), cast('2022-05-18' as date), 15, 13)
    const per = req.body.per
    const pel = req.body.pel
    const fei = req.body.fei
    const fef = req.body.fef
    const hin = req.body.hin
    const hfn = req.body.hfn
    const ido = req.body.ido

    con.query(`insert into peliculas_vistas values(?,?,cast(? as date),cast(? as date),?,?)`, [per, pel, fei, fef, hin, hfn],
        function (error_agregar, resultado) {
            console.log("ID: " + ido + " [ Nueva Operacion /insertarSimulacionVisitas ] + Se ha agregado dato con exito")
            console.log([per, pel, fei, fef, hin, hfn]);
            res.send('Agregado')
        })

})





app.listen(PORT, () => {
    console.log(`App corriendo en http://localhost:${PORT}`)
})