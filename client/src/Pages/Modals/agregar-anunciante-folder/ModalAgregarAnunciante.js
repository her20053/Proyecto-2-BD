import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalAgregarAnunciante({ cerrarModal, admin }) {

    const [anunciante, setanunciante] = useState('');
    const [anuncio, setanuncio] = useState('');

    const handleClick = () => {

        const nombre = anunciante;
        const mensaje = anuncio;
    


        fetch('http://localhost:3010/admin_agregar_anunciante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, mensaje, admin }),
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
                    <h1>Agregar nuevo anunciante</h1>
                    <input type="text" onChange={(e) => setanunciante(e.target.value)} placeholder="Nombre" />
                    <input type="text" onChange={(e) => setanuncio(e.target.value)} placeholder="Anuncio" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregarAnunciante