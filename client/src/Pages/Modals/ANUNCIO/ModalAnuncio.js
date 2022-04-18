import React from 'react'
import '../modal-styles-anuncio.css'
import { useState, useEffect } from 'react'


function ModalAnuncio({ cerrarModal, datos_anuncio }) {

    // console.log(datos_anuncio)

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
                    <h1>{datos_anuncio?.nombre}</h1>
                    <h2>{datos_anuncio?.mensaje}</h2>
                </div>
            </div>
        </div>
    )
}

export default ModalAnuncio