import React, { useState, useEffect } from 'react'
import '../modal-styles.css'

const TopBusquedas = ({ cerrarModal, inicial, final }) => {

    const [topGeneros, setTopGeneros] = useState([])

    useEffect(() => {
        const fInicial = inicial
        const fFinal = final
        
        async function fetchTopGen() {
           fetch('http://localhost:3010/retraerAdmins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fFinal, fInicial }),
        })
               .then(response => {
                //    setTopGeneros(response.json())
                   return response.json()
            })
            .then(data => {
                // alert(data);
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
                    <h1 style={{ color: "#ffba08" }}>Resultados Top Admins</h1>
                    <ol>
                        {topGeneros.map(topGeneros => (
                            <li id="infoTop">ADMINISTRADOR: {topGeneros.id_administrador} | FECHA: {topGeneros.fecha_modificacion.split('T')[0]} | MODIFICACIONES: { topGeneros.modifiaciones}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default TopBusquedas