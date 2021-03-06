import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'

function ModalAgregarUsario({ cerrarModal, admin }) {

    const [nombreusuario, setnombre] = useState('');
    const [correou, setcorreo] = useState('');
    const [lugarcreacionu,setlugarcreacion]=useState('');
    const [clave, setclave] = useState('')
    const [plan , setplan] = useState('')

    const handleClick = () => {
        let id = 'u' + Math.floor(Math.random() * 100000)
        let id_susc = 's' + Math.floor(Math.random() * 100000)
        let nombre_persona = nombreusuario;
        let correo = correou;
        let lugar=lugarcreacionu
        let contrasena = bcrypt.hashSync(clave, bcrypt.genSaltSync());
        const id_admin = admin
        const id_plan = plan
        console.log(JSON.stringify({ id, nombre_persona, correo, lugar,contrasena, id_admin, id_susc, id_plan }))
        fetch('http://localhost:3010/admin_agregar_usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nombre_persona, correo, lugar,contrasena, id_admin, id_susc, id_plan }),
      })
        .then(response => {
            console.log('Se ingreso un usuario correctamente')
            return response.text();
        })
        .then(data => {
        });
        cerrarModal(false)

    }

    return (
        <div className="modal-back">
            <div className="caja-modal">
                <div className="area-cerrar-modal">
                    <button
                        type="button"
                        className="boton-cerrar"
                        onClick={() => cerrarModal(false)}>Cerrar</button>
                </div>
                <div className="area-info-modal">
                    <h1>Agregar nuevo usuario</h1>
                    <input type="text" onChange={(e) => setnombre(e.target.value)} placeholder="Nombre" />
                    <input type="text" onChange={(e) => setcorreo(e.target.value)} placeholder="Correo" />
                    <input type="password" onChange={(e)=>setclave(e.target.value)} placeholder="contrase??a"/>
                    <input type="text" onChange={(e) => setlugarcreacion(e.target.value)} placeholder="Lugar de Creacion" />
                    <input type="text" onChange={(e)=> setplan(e.target.value)} placeholder="Suscripcion"/>

                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregarUsario