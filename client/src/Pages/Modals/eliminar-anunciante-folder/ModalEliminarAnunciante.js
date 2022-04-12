import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalEliminarAnunciante({ cerrarModal }) {

    const [anunciante, setanunciante] = useState('');

    const handleClick = () => {
        console.log("Hola");
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