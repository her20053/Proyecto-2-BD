import React, { useState, useEffect } from 'react'
import '../modal-styles.css'
import Axios from 'axios';

const CantidadCategoria = ({ cerrarModal }) => {

    const [cantidad, setCantidad] = useState([])

    useEffect(() => {
        async function fetchTopGen() {
            fetch('http://localhost:3010/retraerCantidad'
            ).then((response) => {
                return response.json();
            }).then((respuesta) => {
                console.log(respuesta)
                setCantidad(respuesta);
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
                    <h1 style={{ color: "#ffba08" }}>Resultados Cantiad por Categoria</h1>
                    <ol>
                        {cantidad.map(cantidad => (
                            <li id="infoTop">GENERO: {cantidad.nombre_genero} | REPRODUCCIONES: {cantidad.reproducciones} | PLAN: {cantidad.id_plan}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default CantidadCategoria