import React from 'react'
import { useNavigate } from 'react-router-dom';

const Administrator = () => {

    let navigate = useNavigate();

    return (
        <div className='Admin'>
            <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
        </div>
    )
}

export default Administrator