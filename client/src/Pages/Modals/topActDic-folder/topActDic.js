import React, { useState, useEffect } from 'react'
import '../modal-styles.css'

const TopAcDic = ({ cerrarModal }) => {

    const [actores, setActores] = useState([])
    const [directores, setDirectores] = useState([])

    useEffect(() => {
        async function fetchTopAct() {
            fetch('http://localhost:3010/retraerActores'
            ).then((response) => {
                return response.json();
            }).then((respuesta) => {
                console.log(respuesta)
                setActores(respuesta);
            });
        }
        fetchTopAct();
    }, [])

    useEffect(() => {
        async function fetchTopDir() {
            fetch('http://localhost:3010/retraerDirectores'
            ).then((response) => {
                return response.json();
            }).then((respuesta) => {
                console.log(respuesta)
                setDirectores(respuesta);
            });
        }
        fetchTopDir();
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
                    <h1 style={{ color: "#ffba08" }}>Resultados Top Generos Vistos</h1>
                    <div className="gridTopAcDic">
                        <div className='gridTopAc'>
                            <h2 style={{ color: "#ffba08", position: "relative", top: "20px" }}>Top Actores</h2>
                            <ol>
                                {actores.map(actores => (
                                    <li id="infoTop">NOMBRE: {actores.nombre} | VISTAS: {actores.reproducciones} | PLAN: {actores.id_plan}</li>
                                ))}
                            </ol>
                        </div>
                        <div className='gridTopDic'>
                            <h2 style={{ color: "#ffba08", position: "relative", top: "20px" }}>Top Directores</h2>
                            <ol>
                                {directores.map(directores => (
                                    <li id="infoTop">NOMBRE: {directores.nombre} | VISTAS: {directores.reproducciones} | PLAN: {directores.id_plan}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopAcDic