import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalAgregarPelicula({ cerrarModal }) {

    const [bdp, setbdp] = useState('');
    const [drc, setdrc] = useState('');
    const [fce, setfce] = useState('');
    const [idp, setidp] = useState('');
    const [psp, setpsp] = useState('');
    const [rtg, setrtg] = useState('');
    const [rsm, setres] = useState('');
    const [tit, settit] = useState('');
    const [url, seturl] = useState('');

    const handleClick = () => {
        console.log(JSON.stringify({ idp, tit, rsm, url, drc, fce, rtg, psp, bdp }))
        fetch('http://localhost:3010/admin_tools_agregar_pelicula',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idp, tit, rsm, url, drc, fce, rtg, psp, bdp }),
            }).then(respuesta_back_end => {
                console.log(respuesta_back_end)
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
                    <h1>Agregar nueva pelicula</h1>
                    <input type="text" onChange={(e) => setbdp(e.target.value)} placeholder="backdrop_path" />
                    <input type="text" onChange={(e) => setdrc(e.target.value)} placeholder="duracion" />
                    <input type="text" onChange={(e) => setfce(e.target.value)} placeholder="fecha_estreno" />
                    <input type="text" onChange={(e) => setidp(e.target.value)} placeholder="id_pelicula" />
                    <input type="text" onChange={(e) => setpsp(e.target.value)} placeholder="poster_path" />
                    <input type="text" onChange={(e) => setrtg(e.target.value)} placeholder="rating" />
                    <input type="text" onChange={(e) => setres(e.target.value)} placeholder="resumen" />
                    <input type="text" onChange={(e) => settit(e.target.value)} placeholder="titulo" />
                    <input type="text" onChange={(e) => seturl(e.target.value)} placeholder="url" />
                </div>
                <div className="area-enviar-modal">
                    <button type="button" className="boton-enviar" onClick={handleClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregarPelicula