import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Advanced = () => {

  const navigate = useNavigate()

  return (
    <div className="Advanced">
      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
      <div className='contenido-admin'>
        <div className='caja-opciones-admin'>
          <h1>Herramientas de administrador</h1>
          <button id="raise" >Agregar actor</button>
          <button id="raise" >Modificar actor</button>
          <button id="raise" >Eliminar actor</button>
          <button id="raise" >Eliminar perfil</button>
        </div>
        <div className='caja-opciones-admin'>
          <h1>Herramientas de administradores</h1>
          <button id="raise" >Eliminar usuario</button>
          <button id="raise">Eliminar pelicula</button>
          <button id="raise">Agregar usuario</button>
          <button id="raise" >Desactivar perfil</button>
        </div>
        <div className='caja-opciones-admin'>
          <h1>Reporteria avanzada</h1>
          <button id="raise" >Top 5 de contenido mas visto</button>
          <button id="raise" >Top 10 de los terminos de bsuqueda</button>
          <button id="raise" >Top 5 de adiministradores que mas modificaciones realizan</button>
          <button id="raise">Top 20 de peliculas que comenzaron a verse pero que no se terminan</button>
        </div>
      </div>
    </div >
  )
}

export default Advanced