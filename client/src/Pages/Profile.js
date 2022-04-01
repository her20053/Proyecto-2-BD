import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AddCircle } from '@material-ui/icons';
import { TagFaces } from '@material-ui/icons';
import Axios from 'axios';

const Profile = () => {

  let navigate = useNavigate();
  let { username } = useParams();

  const url = window.location.href
  const arrayTemp = url.split('/')
  const idUsuario = arrayTemp[arrayTemp.length - 1]


  const [numeroPerfiles, setNumeroPerfiles] = useState(0);
  const [maxPerfiles, setMaxPerfiles] = useState(0);
  const [grid, setGrids] = useState({ gridTemplateRows: '', gridTemplateColumns: '' });
  const [idPlan, setIdPlan] = useState("")
  const [nombrePlanes, setNombrePlanes] = useState([])

  useEffect(() => {

    Axios.post('http://localhost:3001/retraerPlan', {
      id_usuario: idUsuario,
    }).then((response) => {
      setIdPlan(response.data[0].id_plan)
    });

    Axios.post('http://localhost:3001/retraerPerfiles', {
      id_usuario: idUsuario,
    }).then((response) => {
      setNombrePlanes(response.data.map(m => m.nombre))
    });
  }, [])

  useEffect(() => {
    console.log(idPlan, " test1")
    if (idPlan === 'pl1') {
      setMaxPerfiles(1);
      setGrids({ gridTemplateRows: 'repeat(1, 200px)', gridTemplateColumns: 'repeat(1, 200px)' });
    }
    else if (idPlan === 'pl2') {
      setMaxPerfiles(4);
      setGrids({ gridTemplateRows: 'repeat(1, 200px)', gridTemplateColumns: 'repeat(4 200px)' });
    } else if (idPlan === 'pl3') {
      setMaxPerfiles(8);
      setGrids({ gridTemplateRows: 'repeat(2, 200px)', gridTemplateColumns: 'repeat(4, 200px)' });
    }
  },
    [idPlan])

  useEffect(() => {
    console.log(nombrePlanes, " test2")
    setNumeroPerfiles(nombrePlanes.length)

  },
    [nombrePlanes])

  useEffect(() => {
    console.log(numeroPerfiles, " test3")
  },
    [numeroPerfiles])

  useEffect(() => {
    console.log(maxPerfiles, " test4")
  },
    [maxPerfiles])

  useEffect(() => {
    console.log(grid.gridTemplateRows, grid.gridTemplateColumns, " test5")
  },
    [grid])





  console.log("---------------------RENDER----------------------")
  console.log(numeroPerfiles == maxPerfiles)


  return (
    <div className='Profile'>
      <h1 onClick={() => { navigate("/") }} id="titulo">MEMEFLIX</h1>
      <h1 id='quien'>¿Quién Está Viendo?</h1>
      <div className='gridPerfiles' style={{
        gridTemplateRows: grid.gridTemplateRows,
        gridTemplateColumns: grid.gridTemplateColumns
      }}>

        {
          nombrePlanes.map(nombre => {
            return (
              <div key={nombre}>
                <TagFaces onClick={() => {
                  navigate(`/home/${idUsuario}/${nombre}`)
                }}
                  style={{ color: "white", fontSize: '180' }}
                  className="perfil" />
                <h4>{nombre}</h4>
              </div>
            )
          })
        }

        {
          // Ver si renderizamos el boton de mas
          (numeroPerfiles == maxPerfiles)
            ?
            <p></p>
            :
            <div>
              <AddCircle onClick={() => { navigate(`/addprofile/${idUsuario}`) }} style={{ color: "white", fontSize: '180' }} id='agregarPerfil' />
              <h4>Agregar Perfil</h4>
            </div>
        }



      </div>
      <div className="Manejar">
        <button id="btnmanejar">Manejar Perfiles</button>
      </div>
    </div>
  )
}

export default Profile