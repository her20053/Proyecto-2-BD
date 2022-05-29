import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalEliminarPelicula({ cerrarModal, admin }) {


    const [pelicula, setpelicula] = useState('');
    const id_admin = admin

    const handleClick = () => {
        const id_pelicula = pelicula;

        fetch('http://localhost:3010/admin_eliminar_pelicula', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_pelicula, id_admin}),
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
                    <h1>Eliminar pelicula</h1>
                    <input type="text" onChange={(e) => setpelicula(e.target.value)} placeholder="ID Pelicula" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarPelicula