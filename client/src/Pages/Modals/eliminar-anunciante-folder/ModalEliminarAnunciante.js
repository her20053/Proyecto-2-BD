import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalEliminarAnunciante({ cerrarModal }) {

    const [anunciante, setanunciante] = useState('');

    const handleClick = () => {
        const id_anunciante = anunciante;

        fetch('http://localhost:3010/admin_eliminar_anunciante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_anunciante}),
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
                    <h1>Eliminar anunciante</h1>
                    <input type="text" onChange={(e) => setanunciante(e.target.value)} placeholder="ID Anunciante" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarAnunciante