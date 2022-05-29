import React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { NumberInput, Modal, Text, Button, Loader } from '@mantine/core';

import { DatePicker } from '@mantine/dates';

import { Calendar } from 'tabler-icons-react';

import Axios from 'axios';

const Advanced = () => {

  const navigate = useNavigate()

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

      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
      <button className='btnAvanzado' onClick={() => setModalSimuladorVistas(true)}>Simulador Vistas</button>
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