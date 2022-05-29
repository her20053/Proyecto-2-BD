import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalEliminarUsuario({ cerrarModal, admin }) {


    const [usuario, setusuario] = useState('');
    const id_admin = admin

    const handleClick = () => {
        const id_usuario = usuario;

        fetch('http://localhost:3010/admin_eliminar_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_usuario, id_admin}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                // getUsuarios();
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
                    <h1>Eliminar usuario</h1>
                    <input type="text" onChange={(e) => setusuario(e.target.value)} placeholder="ID usuario" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarUsuario