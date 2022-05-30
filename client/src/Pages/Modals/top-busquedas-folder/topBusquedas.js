import React, { useState, useEffect } from 'react'
import '../modal-styles.css'

const TopBusquedas = ({ cerrarModal }) => {

    const [topGeneros, setTopGeneros] = useState([])

    useEffect(() => {
        async function fetchTopGen() {
            fetch('http://localhost:3010/retraerBusquedas'
            ).then((response) => {
                return response.json();
            }).then((respuesta) => {
                console.log(respuesta)
                setTopGeneros(respuesta);
            });
        }
        fetchTopGen();
    }, [])


    return (
        <div className="modal-back">
            <div className="caja-modal">
                <div className="area-cerrar-modal">
                    <button
                        type="button"
                        className="boton-cerrar"
                        onClick={() => cerrarModal(false)}>Cerrar</button>
                </div>
                <div>
                    <h1 style={{ color: "#ffba08" }}>Resultados Top Busquedas</h1>
                    <ol>
                        {topGeneros.map(topGeneros => (
                            <li id="infoTop">TERMINO: {topGeneros.busqueda} | CANTIDAD: {topGeneros.cuenta} veces</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default TopBusquedas