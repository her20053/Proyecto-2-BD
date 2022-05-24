import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const LoginAdmin = () => {
    let navigate = useNavigate();

    const [usua, setUsua] = useState('')
    const [clav, setClav] = useState('')

    const retraerUsuario = async () => {

        const u_temp = usua
        const c_temp = clav

        fetch('http://localhost:3001/retraerAdmin',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ u_temp, c_temp })
            }).then((response) => response.json())
            .then((data) => {
                if (data.mensaje_error) {
                    console.log(data.mensaje_error)
                }
                else {
                    if (bcrypt.compareSync(clav, data[0].contrasena)) {
                        navigate(`/administrator/` + data[0].id_admin)
                    }
                    else {
                        alert("Usuario o clave incorrectos, intente de nuevo...")
                    }
                    // console.log(data[0].id_usuario)
                }

            })

    }

    return (
        <div className="Login">
            <h1 onClick={() => { navigate("/") }} id="titulo">MEMEFLIX</h1>
            <div className='box' id='loginForm'>
                <h1>Administrador</h1>
                <div className='inputs'>
                    <input
                        type="text"
                        placeholder="Correo Electrónico"
                        id="email_login"
                        onInput={(e) => setUsua(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        id="password_login"
                        onInput={(e) => setClav(e.target.value)}
                    />
                    <button onClick={retraerUsuario}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin