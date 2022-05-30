
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import { Modal, Button, Group } from '@mantine/core';

import ModalEliminarPelicula from './Modals/eliminar-pelicula-folder/ModalEliminarPelicula'
import ModalEliminarUsuario from './Modals/eliminar-usuario-folder/ModalEliminarUsuario'
import ModalEliminarActor from './Modals/eliminar-actor-folder/ModalEliminarActor'
import ModalEliminarPerfil from './Modals/eliminar-perfil-folder/ModalEliminarPerfil'
import ModalAgregarActor from './Modals/Agregar-actor/ModalAgregarActor'
import ModalAgregarPerfil from './Modals/Agregar-perfil/ModalAgregarPerfil'
import ModalModificarActor from './Modals/modificar-actor-folder/modificarActor'
import TopBusquedas from './Modals/top-busquedas-folder/topBusquedas'
import TopAdmins from './Modals/top-admins-folder/topAdmins'
import TopTerminar from './Modals/top-sterminar-folder/topTerminar'
import Top5MasVistos from './Modals/Top-5-Contenido-Visto/Top5MasVistos'

import { useEffect } from 'react';

import { NumberInput, Modal, Text, Button, Loader, Input } from '@mantine/core';

import { DatePicker } from '@mantine/dates';

import { Calendar } from 'tabler-icons-react';

import Axios from 'axios';


const Advanced = () => {

  const navigate = useNavigate()
  const [fechaInicial, setFechaInicial] = useState('')
  const [fechaFinal, setfechaFinal] = useState('');
  const [opened, setOpened] = useState(false);
  const [opened1, setOpened1] = useState(false);
  const [modal_elp, setmodal_elp] = useState(false);
  const [modal_elu, setmodal_elu] = useState(false);
  const [modal_ela, setmodal_ela] = useState(false);
  const [modal_elpe, setmodal_elpe] = useState(false);
  const [modal_aac, setmodal_aac] = useState(false);
  const [modal_ape, setmodal_ape] = useState(false);
  const [modal_mac, setmodal_mac] = useState(false);
  const [modal_tbu, setmodal_tbu] = useState(false);
  const [modal_tad, setmodal_tad] = useState(false);
  const [modal_tst, setmodal_tst] = useState(false);
  const [modal_t5v, setModal_t5v] = useState(false);

  let { username } = useParams();

  const [modalSimuladorVistas, setModalSimuladorVistas] = useState(false);
  const [valorVisitas, setValorVisitas] = useState(5);
  const [fechaElejida, onChangefechaElejida] = useState(new Date());
  const [enEsperaRequest, setEnEsperaRequest] = useState(false);


  const [perfilesRetraidos, setPerfilesRetraidos] = useState([]);
  const [peliculasRetraidas, setPeliculasRetraidas] = useState([]);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleClick = () => {
    setOpened(false)
    setmodal_tad(true)
  }

  const handleClick1 = () => {
    setOpened1(false)
    setmodal_tst(true)
  }

  useEffect(() => {
    // console.log(peliculasRetraidas)
    // console.log(perfilesRetraidos)
    if (peliculasRetraidas.length > 0 && perfilesRetraidos.length > 0) {
      // console.log('Se envio')
      // console.log(perfilesRetraidos[Math.floor(Math.random() * perfilesRetraidos.length)].id_perfil)
      // console.log(peliculasRetraidas[Math.floor(Math.random() * peliculasRetraidas.length)].id_pelicula)

      let promesas = []

      for (let i = 0; i < valorVisitas; i++) {


        const perfilTemp = perfilesRetraidos[Math.floor(Math.random() * perfilesRetraidos.length)].id_perfil
        const peliculaTemp = peliculasRetraidas[Math.floor(Math.random() * peliculasRetraidas.length)].id_pelicula
        // console.log('Query ', perfilTemp, peliculaTemp, "\n");
        const fechaTemp = fechaElejida.getFullYear() + '-' + fechaElejida.getMonth() + '-' + fechaElejida.getDate()
        // console.log(fechaTemp)

        const fechaFinal = addDays(fechaElejida, Math.floor(Math.random() * (10 - 1 + 1) + 1))
        const fechaFinalTemp = fechaFinal.getFullYear() + '-' + fechaFinal.getMonth() + '-' + fechaFinal.getDate()
        // console.log(fechaFinalTemp)

        const horaAleatoria1 = Math.floor(Math.random() * (24 - 1 + 1) + 1)
        const horaAleatoria2 = Math.floor(Math.random() * (24 - 1 + 1) + 1)

        // console.log(horaAleatoria1, horaAleatoria2)

        // const per = req.body.per
        // const pel = req.body.pel
        // const fei = req.body.fei
        // const fef = req.body.fef
        // const hin = req.body.hin
        // const hfn = req.body.hfn

        promesas.push(
          Axios.post('http://localhost:3010/insertarSimulacionVisitas', {
            per: perfilTemp,
            pel: peliculaTemp,
            fei: fechaTemp,
            fef: fechaFinalTemp,
            hin: horaAleatoria1,
            hfn: horaAleatoria2,
            ido: i
          }).then(function (response) {
            console.log(response);
          })
            .catch(function (error) {
              console.log(error);
            })
        )

        // console.log(i)

      }

      Promise.all(promesas).then(() => { console.log('Promesas enviadas'); })

    }
  }, [peliculasRetraidas]);

  const realizarPeticionAgregar = () => {

    // console.log(fechaElejida.getDate(), fechaElejida.getMonth(), fechaElejida.getYear());
    // console.log(valorVisitas)

    fetch('http://localhost:3010/retraerTodosPerfiles')
      .then(response => response.json())
      .then(data => {
        setPerfilesRetraidos(data)
      })
      .catch(err => console.error(err));

    fetch('http://localhost:3010/retraerTodasPeliculas')
      .then(response => response.json())
      .then(data => {
        setPeliculasRetraidas(data)
      })
      .catch(err => console.error(err));

    // for(const perfil of listaPefilesRetraidos){
    //   console.log(perfil)
    // }

  }

  return (
    <div className="Advanced">

      {modal_elp && <ModalEliminarPelicula cerrarModal={setmodal_elp} admin={username} />}
      {modal_elu && <ModalEliminarUsuario cerrarModal={setmodal_elu} admin={username} />}
      {modal_ela && <ModalEliminarActor cerrarModal={setmodal_ela} admin={username} />}
      {modal_elpe && <ModalEliminarPerfil cerrarModal={setmodal_elpe} admin={username} />}
      {modal_aac && <ModalAgregarActor cerrarModal={setmodal_aac} admin={username} />}
      {modal_ape && <ModalAgregarPerfil cerrarModal={setmodal_ape} admin={username} />}
      {modal_mac && <ModalModificarActor cerrarModal={setmodal_mac} admin={username} />}
      {modal_tbu && <TopBusquedas cerrarModal={setmodal_tbu} admin={username} />}
      {modal_tad && <TopAdmins cerrarModal={setmodal_tad} inicial={fechaInicial} final={fechaFinal} />}
      {modal_tst && <TopTerminar cerrarModal={setmodal_tst} inicial={fechaInicial} final={fechaFinal} />}

      <Top5MasVistos opened={modal_t5v} setOpened={setModal_t5v} />

      <Modal
        transition="rotate-left"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={modalSimuladorVistas}
        onClose={() => setModalSimuladorVistas(false)}
        title="Ingresa una nueva simulacion"
      >
        <div className="area_selecciones_simulacion">
          <DatePicker
            placeholder="Escoja una fecha"
            label="Fecha del evento"
            required
            value={fechaElejida}
            onChange={onChangefechaElejida}
            icon={<Calendar size={16} />}
          />
          <NumberInput
            value={valorVisitas} onChange={(valorVisitas) => setValorVisitas(valorVisitas)}
            defaultValue={100}
            placeholder="Cantidad de vistas nuevas"
            label="Cantidad"
            description="Ingrese cuantas visualizaciones nuevas desea generar "
            required
            hideControls
          />
          {enEsperaRequest
            ?
            <Loader className="loader_request_visualizaciones" color="orange" />
            : null}
          <Button color="yellow" uppercase onClick={() => {
            realizarPeticionAgregar()
            // setEnEsperaRequest(true)
          }}>
            Enviar peticion
          </Button>

        </div>
      </Modal>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Elija el rango de fechas!"
      >
        <Input onInput={(e) => setFechaInicial(e.target.value)} variant="default" placeholder="Fecha Inicial" />
        <Input onInput={(e) => setfechaFinal(e.target.value)} variant="default" placeholder="Fecha Final" type='text' />
        <button onClick={() => handleClick()} className="btnAdminAgregado">Continuar</button>
      </Modal>

      <Modal
        opened={opened1}
        onClose={() => setOpened(false)}
        title="Elija el rango de fechas!"
      >
        <Input onInput={(e) => setFechaInicial(e.target.value)} variant="default" placeholder="Fecha Inicial" />
        <Input onInput={(e) => setfechaFinal(e.target.value)} variant="default" placeholder="Fecha Final" type='text' />
        <button onClick={() => handleClick1()} className="btnAdminAgregado">Continuar</button>
      </Modal>


      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
      <button className='btnAvanzado' onClick={() => setModalSimuladorVistas(true)}>Simulador Vistas</button>
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
          <button id="raise" onClick={() => { setModal_t5v(true) }}>Top 5 de contenido mas visto</button>
          <button id="raise" onClick={() => { setmodal_tbu(true); }} >Top 10 de los terminos de busqueda</button>
          <button id="raise" onClick={() => { setOpened(true); }} >Top 5 de adiministradores que mas modificaciones realizan</button>
          <button id="raise" onClick={() => { setOpened1(true); }} >Top 20 de peliculas que comenzaron a verse pero que no se terminan</button>
        </div>
      </div>
    </div >
  )
}

export default Advanced