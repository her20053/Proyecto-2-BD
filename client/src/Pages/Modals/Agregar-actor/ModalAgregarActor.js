import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'

function ModalAgregarActor({ cerrarModal, admin }) {

    const [nombreactor, setnombre] = useState('');
    const [genero, setgenero] = useState('');
    const [edad,setedad]=useState('');

    const handleClick = () => {
        let id = 'ac' + Math.floor(Math.random() * 100000)
        let nombre_persona = nombreactor;
        let generoAc = genero;
        let edadAc=edad
        const id_admin = admin
        console.log(JSON.stringify({ id, nombre_persona, generoAc, edadAc, id_admin }))
        fetch('http://localhost:3010/admin_agregar_actor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nombre_persona, generoAc, edadAc, id_admin }),
      })
        .then(response => {
            console.log('Se ingreso un actor correctamente')
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
                    <h1>Agregar nuevo actor</h1>
                    <input type="text" onChange={(e) => setnombre(e.target.value)} placeholder="Nombre" />
                    <input type="text" onChange={(e) => setgenero(e.target.value)} placeholder="Genero" />
                    <input type="text" onChange={(e)=>setedad(e.target.value)} placeholder="Edad"/>

                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregarActor