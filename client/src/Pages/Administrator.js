import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'
import { Modal } from '@mantine/core';
import { Input } from '@mantine/core';
import bcrypt from 'bcryptjs'

// Importando todos los modales requeridos para la pagina:


// Columnas de herramientas para peliculas
import ModalAgregarPelicula from './Modals/agregar-pelicula-folder/ModalAgregarPelicula'
import ModalModificarPelicula from './Modals/modificar-pelicula-folder/ModalModificarPelicula'
import ModalCorregirPelicula from './Modals/corregir-pelicula-folder/ModalCorregirPelicula'
import ModalAgregarAnunciante from './Modals/agregar-anunciante-folder/ModalAgregarAnunciante'
import ModalEliminarAnunciante from './Modals/eliminar-anunciante-folder/ModalEliminarAnunciante'
import ModalAgregarUsuario from './Modals/Agregar-usuario/ModalAgregarUsuario'
import ModalModificarUsuario from './Modals/modificar-usuario-folder/modificarUsuario'
import TopGenerosVistos from './Modals/top-generos-vistos-folder/topGenerosVistos'
import CantidadCategoria from './Modals/cantidad-categoria-folder/cantidadCategoria'
import TopActDic from './Modals/topActDic-folder/topActDic'
import CuentaAvanzada from './Modals/CuentaAvanzada/Modal_CuentaAvanzada'
import Status1 from './Modals/Actualizar-status/ModalActualizarstatus'
import Status11 from './Modals/ActualizarModals1/Actualizarmodals1'
import HoraPico from './Modals/HoraPico/HoraPico'

const Administrator = () => {

  let navigate = useNavigate();
  let { username } = useParams();

  const [opened, setOpened] = useState(false);

  // Columnas de herramientas para peliculas
  const [modal_map, setmodal_map] = useState(false);
  const [modal_mmp, setmodal_mmp] = useState(false);
  const [modal_mcp, setmodal_mcp] = useState(false);
  const [modal_maa, setmodal_maa] = useState(false);
  const [modal_mea, setmodal_mea] = useState(false);
  const [modal_agu, setmodal_agu] = useState(false);
  const [modal_mmu, setmodal_mmu] = useState(false);
  const [modal_top, setmodal_top] = useState(false);
  const [modal_cat, setmodal_cat] = useState(false);
  const [modal_act, setmodal_act] = useState(false);
  const [modal_cv, setmodal_cv] = useState(false);
  const [modal_s1, setmodal_s1] = useState(false);
  const [modal_s11, setmodal_s11] = useState(false);
  const [modal_hora, setmodal_hora] = useState(false);


  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [lugar, setlugar] = useState('');
  const [contrasena, setcontrasena] = useState('');

  const handleClick = () => {
    setOpened(false);
    let id_admin = 'a' + Math.floor(Math.random() * 100000)
    let nombre_admin = nombre;
    let correo_admin = correo;
    let lugar_admin = lugar;
    let contrasena_admin = bcrypt.hashSync(contrasena, bcrypt.genSaltSync());
    console.log(JSON.stringify({ id_admin, nombre_admin, correo_admin, lugar_admin, contrasena_admin }))
    fetch('http://localhost:3010/pruebaInsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_admin, nombre_admin, correo_admin, lugar_admin, contrasena_admin }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        // getUsuarios();
      });
  }

  return (
    <div className='Admin'>
      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
      <button className='btnAvanzado'>Opciones Avanzadas</button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar Administrador"
      >
        <Input onInput={(e) => setNombre(e.target.value)} variant="default" placeholder="Nombre" />
        <Input onInput={(e) => setCorreo(e.target.value)} variant="default" placeholder="Correo" type='email' />
        <Input onInput={(e) => setlugar(e.target.value)} variant="default" placeholder="Lugar de creacion" />
        <Input onInput={(e) => setcontrasena(e.target.value)} variant="default" placeholder="Contrasena" type='password' />

        <button onClick={() => handleClick()} className="btnAdminAgregado">Agregar</button>
      </Modal>
      {
        username === 'a002' ? <button onClick={() => setOpened(true)} className='btnAgregarA'>Agregar Admin</button> : null
      }

      {modal_map && <ModalAgregarPelicula cerrarModal={setmodal_map} />}
      {modal_mmp && <ModalModificarPelicula cerrarModal={setmodal_mmp} />}
      {modal_mcp && <ModalCorregirPelicula cerrarModal={setmodal_mcp} />}
      {modal_maa && <ModalAgregarAnunciante cerrarModal={setmodal_maa} admin={username} />}
      {modal_mea && <ModalEliminarAnunciante cerrarModal={setmodal_mea} />}
      {modal_agu && <ModalAgregarUsuario cerrarModal={setmodal_agu} />}
      {modal_mmu && <ModalModificarUsuario cerrarModal={setmodal_mmu} />}
      {modal_top && <TopGenerosVistos cerrarModal={setmodal_top} />}
      {modal_cat && <CantidadCategoria cerrarModal={setmodal_cat} />}
      {modal_act && <TopActDic cerrarModal={setmodal_act} />}
      {modal_cv && <CuentaAvanzada cerrarModal={setmodal_cv} />}
      {modal_s1 && <Status1 cerrarModal={setmodal_s1} />}
      {modal_s11 && <Status11 cerrarModal={setmodal_s11} />}
      {modal_hora && <HoraPico cerrarModal={setmodal_hora} />}

      <div className='contenido-admin'>
        <div className='caja-opciones-admin'>
          <h1>Herramientas de peliculas</h1>
          <button id="raise" onClick={() => { setmodal_map(true); }}>Agregar pelicula</button>
          <button id="raise" onClick={() => { setmodal_mmp(true); }}>Modificar pelicula</button>
          <button id="raise" onClick={() => { setmodal_mcp(true); }}>Corregir pelicula</button>
          <button id="raise" onClick={() => { setmodal_maa(true); }}>Agregar anunciante</button>
          <button id="raise" onClick={() => { setmodal_mea(true); }}>Eliminar anunciante</button>
        </div>
        <div className='caja-opciones-admin'>
          <h1>Herramientas de usuarios</h1>
          <button id="raise" onClick={() => { setmodal_agu(true); }}>Agregar usuario</button>
          <button id="raise" onClick={() => { setmodal_mmu(true); }}>Modificar usuario</button>
          <button id="raise">Corregir direccion de usuario</button>
          <button id="raise" onClick={() => { setmodal_s1(true); }}>Desactivar perfil</button>
          <button id="raise" onClick={() => { setmodal_s11(true); }}>Activar perfil</button>
        </div>
        <div className='caja-opciones-admin'>
          <h1>Reportes e info de peliculas</h1>
          <button id="raise" onClick={() => { setmodal_top(true); }}>Los 10 generos mas vistos</button>
          <button id="raise" onClick={() => { setmodal_cat(true); }}>Cantidad de reproducciones por categoria</button>
          <button id="raise" onClick={() => { setmodal_act(true); }}>Top 10 actores y directores</button>
          <button id="raise" onClick={() => { setmodal_cv(true); }}>Cantidad de cuentas avanzadas en 6 meses</button>
          <button id="raise"  >Fecha especifica, ¿cual es la hora pico?</button>
        </div>
      </div>
    </div >
  )
}

export default Administrator