import React from 'react'
import '../modal-styles.css'
import { useState, useEffect } from 'react'

function ModalModificarPelicula({ cerrarModal, admin }) {

    const [idu, setidu] = useState('');

    const [nuevovalor, setnuevovalor] = useState();

    const [area, setarea] = useState();

    const handleClick = () => {
        
        const id_admin = admin
        console.log( JSON.stringify({ idu, nuevovalor, area, id_admin }))
        fetch('http://localhost:3010/admin_tools_modificar_usuario',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idu, nuevovalor, area, id_admin })
            }).then((response) => response.json())

        cerrarModal(false)
        console.log(area)

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
                    <h1>Modificar Usuario</h1>
                    <select
                        onChange={(e) => setarea(e.target.value)}>
                        <option value="nombre">nombre</option>
                        <option value="correo">correo</option>
                        <option selected value="contrasena">contrasena</option>
                    </select>
                    <input type="text" onChange={(e) => setidu(e.target.value)} placeholder="id_usuario" />
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