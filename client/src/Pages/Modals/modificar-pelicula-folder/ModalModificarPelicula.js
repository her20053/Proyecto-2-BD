import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalModificarPelicula({ cerrarModal }) {

    const [idp, setidp] = useState('');

    const [nuevovalor, setnuevovalor] = useState();

    const [area, setarea] = useState();

    const handleClick = () => {

        console.log(idp, nuevovalor, area)

        fetch('http://localhost:3010/admin_tools_modificar_pelicula',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idp, nuevovalor, area })
            }).then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
            })


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
                    <h1>Modificar Pelicula</h1>
                    <select
                        onChange={(e) => setarea(e.target.value)}>
                        <option value="backdrop_path">backdrop_path</option>
                        <option value="duracion">duracion</option>
                        <option selected value="fecha_estreno">fecha_estreno</option>
                        <option value="poster_path">poster_path</option>
                        <option value="rating">rating</option>
                        <option value="resumen">resumen</option>
                        <option value="titulo">titulo</option>
                        <option value="url">url</option>
                    </select>
                    <input type="text" onChange={(e) => setidp(e.target.value)} placeholder="id_pelicula" />
                    <input type="text" onChange={(e) => setnuevovalor(e.target.value)} placeholder="nuevo valor" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalModificarPelicula