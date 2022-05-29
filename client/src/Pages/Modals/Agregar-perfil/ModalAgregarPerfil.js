import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'

function ModalAgregarUsario({ cerrarModal, admin }) {

    const [nombreusuario, setnombre] = useState('');
    const [estatus, setEstatus] = useState(0);
    const [idU, setIDU] = useState('')

    const handleClick = () => {
        let id = 'pe' + Math.floor(Math.random() * 100000)
        let nombre_persona = nombreusuario;
        let estatusP = estatus
        let id_usuario = idU
        let id_admin = admin
        // console.log(JSON.stringify({ id, nombre_persona, correo, lugar,contrasena, id_admin, id_susc, id_plan }))
        fetch('http://localhost:3010/admin_agregar_perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, id_usuario, nombre_persona, estatusP, id_admin }),
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
                    <h1>Agregar nuevo perfil</h1>
                    <input type="text" onChange={(e) => setIDU(e.target.value)} placeholder="Id usuario" />
                    <input type="text" onChange={(e) => setnombre(e.target.value)} placeholder="Nombre" />
                    <input type="text" onChange={(e)=>setEstatus(e.target.value)} placeholder="Estatus"/>

                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregarUsario