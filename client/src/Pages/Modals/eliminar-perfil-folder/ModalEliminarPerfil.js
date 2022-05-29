import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalEliminarPerfil({ cerrarModal, admin }) {


    const [perfil, setperfil] = useState('');
    const id_admin = admin

    const handleClick = () => {
        const id_perfil = perfil;

        fetch('http://localhost:3010/admin_eliminar_perfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_perfil, id_admin}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                // getperfils();
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
                    <h1>Eliminar perfil</h1>
                    <input type="text" onChange={(e) => setperfil(e.target.value)} placeholder="ID perfil" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarPerfil