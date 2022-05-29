import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import ModalEliminarPelicula from './Modals/eliminar-pelicula-folder/ModalEliminarPelicula'
import ModalEliminarUsuario from './Modals/eliminar-usuario-folder/ModalEliminarUsuario'
import ModalEliminarActor from './Modals/eliminar-actor-folder/ModalEliminarActor'
import ModalEliminarPerfil from './Modals/eliminar-perfil-folder/ModalEliminarPerfil'
import ModalAgregarActor from './Modals/Agregar-actor/ModalAgregarActor'
import ModalAgregarPerfil from './Modals/Agregar-perfil/ModalAgregarPerfil'
import ModalModificarActor from './Modals/modificar-actor-folder/modificarActor'

const Advanced = () => {

  const navigate = useNavigate()
  const [modal_elp, setmodal_elp] = useState(false);
  const [modal_elu, setmodal_elu] = useState(false);
  const [modal_ela, setmodal_ela] = useState(false);
  const [modal_elpe, setmodal_elpe] = useState(false);
  const [modal_aac, setmodal_aac] = useState(false);
  const [modal_ape, setmodal_ape] = useState(false);
  const [modal_mac, setmodal_mac] = useState(false);
  
  let { username } = useParams();

  return (
    <div className="Advanced">
      {modal_elp && <ModalEliminarPelicula cerrarModal={setmodal_elp} admin={username} />}
      {modal_elu && <ModalEliminarUsuario cerrarModal={setmodal_elu} admin={username} />}
      {modal_ela && <ModalEliminarActor cerrarModal={setmodal_ela} admin={username} />}
      {modal_elpe && <ModalEliminarPerfil cerrarModal={setmodal_elpe} admin={username} />}
      {modal_aac && <ModalAgregarActor cerrarModal={setmodal_aac} admin={username} />}
      {modal_ape && <ModalAgregarPerfil cerrarModal={setmodal_ape} admin={username} />}
      {modal_mac && <ModalModificarActor cerrarModal={setmodal_mac} admin={username} />}

      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
      <button className='btnAvanzado'>Simulador Vistas</button>
      <div className='contenido-admin'>
        <div className='caja-opciones-admin'>
          <h1>Herramientas de administrador</h1>
          <button id="raise" onClick={() => { setmodal_aac(true); }} >Agregar actor</button>
          <button id="raise" onClick={() => { setmodal_mac(true); }} >Modificar actor</button>
          <button id="raise" onClick={() => { setmodal_ela(true); }} >Eliminar actor</button>
          <button id="raise" onClick={() => { setmodal_elpe(true); }} >Eliminar perfil</button>
        </div>
        <div className='caja-opciones-admin'>
          <h1>Herramientas de administradores</h1>
          <button id="raise" onClick={() => { setmodal_elu(true); }} >Eliminar usuario</button>
          <button id="raise" onClick={() => { setmodal_elp(true); }} >Eliminar pelicula</button>
          <button id="raise" onClick={() => { setmodal_ape(true); }} >Agregar perfil</button>
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