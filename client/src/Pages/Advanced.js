import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Advanced = () => {

  const navigate = useNavigate()

  return (
    <div className="Advanced">
      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
    </div>
  )
}

export default Advanced