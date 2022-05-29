import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalEliminarActor({ cerrarModal, admin }) {


    const [actor, setactor] = useState('');
    const id_admin = admin

    const handleClick = () => {
        const id_actor = actor;

        fetch('http://localhost:3010/admin_eliminar_actor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_actor, id_admin}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                // getactors();
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
                    <h1>Eliminar actor</h1>
                    <input type="text" onChange={(e) => setactor(e.target.value)} placeholder="ID actor" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarActor