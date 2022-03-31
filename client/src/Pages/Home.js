import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Home= ()=> {

  let navigate = useNavigate();
  let {profile} = useParams;

  return (
    <div className='Home'>Home
      <div className = "peliGrande">

      </div>
      <div className='mainNav' role='navigation'>
        <h1 onClick={() => {navigate("/home/1/2")}} id = "tituloHome">MEMEFLIX</h1>
        <ul className="primaryNav">
          <li className="navTab">Inicio</li>
          <li className="navTab">Peliculas</li>
          <li className="navTab">Series</li>
          <li className="navTab">Favoritos</li>
        </ul>
        <div className="secondaryNav">
          <div className="navElem">Search</div>
          <div className="navElem">Perfil</div>
        </div>
      </div>
      
    </div>
  )
}

export default Home