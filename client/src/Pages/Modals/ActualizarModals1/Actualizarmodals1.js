import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalActualizarstatus1({ cerrarModal }) {

    const [idperf, setidperfil] = useState('');

    const handleClick = () => {
        const id_perfil=idperf
        console.log(JSON.stringify({id_perfil}))
        fetch('http://localhost:3010/actualizarstatus1',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id_perfil})
            })
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
                    <h1>Actualizar estatus</h1>
                    <input type="text" onChange={(e) => setidperfil(e.target.value)} placeholder="ID Perfil" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalActualizarstatus1