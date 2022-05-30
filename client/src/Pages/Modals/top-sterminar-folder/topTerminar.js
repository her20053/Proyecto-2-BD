import React, { useState, useEffect } from 'react'
import '../modal-styles.css'

const TopBusquedas = ({ cerrarModal, inicial, final }) => {

    const [topGeneros, setTopGeneros] = useState([])

    useEffect(() => {
        const fInicial = inicial
        const fFinal = final
        console.log( JSON.stringify({ fFinal, fInicial }))
        async function fetchTopGen() {
           fetch('http://localhost:3010/retraerTerminar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fInicial, fFinal }),
        })
               .then(response => {
                //    setTopGeneros(response.json())
                   return response.json()
            })
            .then(data => {
                // alert(data);
                console.log(data)
                setTopGeneros(data)
            });

    }
        fetchTopGen();
    }, [])

    useEffect(() => {
        console.log(topGeneros)
    }, [topGeneros]);

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
                    <h1 style={{ color: "#ffba08" }}>Resultados Top Contenido no Terminado</h1>
                    <ol>
                        {topGeneros.map(topGeneros => (
                            <li id="infoTop">PELICULA: {topGeneros.id_pelicula} | FECHA_I: {topGeneros.fecha_inicial.split('T')[0]} | TOTAL: {topGeneros.total }</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default TopBusquedas