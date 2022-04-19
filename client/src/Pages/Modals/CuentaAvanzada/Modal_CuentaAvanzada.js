import React, { useState, useEffect } from 'react'
import '../modal-styles.css'
import Axios from 'axios';

const CuentaAvanzada = ({ cerrarModal }) => {

    const [cuentas, setcuentas] = useState([])


    useEffect(() => {
        async function fetchTopGen() {
            fetch('http://localhost:3010/retraerCuentaAvanzada'
            ).then((response) => {
                return response.json();
            }).then((respuesta) => {
                console.log(respuesta)
                setcuentas(respuesta);
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
                    <h1 style={{ color: "#ffba08" }}>Cuentas avanzadas</h1>
                    {cuentas.map(cuentas => (
                        <h1 id="cantidad_cuentas">Cantidad Cuentas: {cuentas.cuentavanzada}</h1>
                    ))}
            
                </div>
            </div>
        </div>
    )
}

export default CuentaAvanzada