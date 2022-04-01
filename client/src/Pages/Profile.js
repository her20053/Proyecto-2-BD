import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AddCircle } from '@material-ui/icons';
import { TagFaces } from '@material-ui/icons';
import Axios from 'axios';

const Profile = () => {

  let navigate = useNavigate();
  let { username } = useParams();

  const [numeroPerfiles, setNumeroPerfiles] = useState(0);
  const [maxPerfiles, setMaxPerfiles] = useState(0);
  const [grid, setGrids] = useState({ gridTemplateRows: 'repeat(1, 200px)', gridTemplateColumns: 'repeat(1, 200px)' });
  const [url, setUrl] = useState(window.location.href);
  const [arrayTemp, setArrayTemp] = useState(url.split('/'));
  const [idUsuario, setIdUsuario] = useState(arrayTemp[arrayTemp.length - 1]);
  const [idPlan, setIdPlan] = useState("")
  const [nombrePlanes, setNombrePlanes] = useState([])

  //retrayendo el id del plan
  // useEffect(() => {

  // },[])

  //retrayendo los perfiles que tiene el usuario
  useEffect(() => {

    Axios.post('http://localhost:3001/retraerPlan', {
      id_usuario: idUsuario,
    }).then((response) => {
      if (response.data[0].id_plan) {
        setIdPlan(response.data[0].id_plan)
      }
    });

    Axios.post('http://localhost:3001/retraerPerfiles', {
      id_usuario: idUsuario,
    }).then((response) => {
      // const planesNombreTemp = []

      setNombrePlanes(response.data.map(m => m.nombre))

      // response.data.map(p => { planesNombreTemp.push(p.nombre) })
      // console.log(planesNombreTemp)
      // console.log(typeof (nombrePlanes))
      console.log(response.data)
      // console.log(nombrePlanes)

      // if (nombrePlanes.objects.length > 0) {
      //   setNumeroPerfiles(nombrePlanes.objects.length)
      // }

      // if (idPlan === 'pl1') {
      //   console.log("plan1")
      //   setMaxPerfiles((prev) => { prev = prev + 1 });
      //   console.log(maxPerfiles)
      //   setGrids({ gridTemplateRows: 'repeat(1, 200px)', gridTemplateColumns: 'repeat(1, 200px)' });
      // } else if (idPlan === 'pl2') {
      //   console.log("plan")
      //   setMaxPerfiles((prev) => { prev = prev + 4 });
      //   console.log(maxPerfiles)
      //   setGrids({ gridTemplateRows: 'repeat(1, 200px)', gridTemplateColumns: 'repeat(5 200px)' });
      // } else if (idPlan === 'pl3') {
      //   console.log("plan3")
      //   setMaxPerfiles((prev) => { prev = prev + 8 });
      //   console.log(maxPerfiles)
      //   setGrids({ gridTemplateRows: 'repeat(2, 200px)', gridTemplateColumns: 'repeat(4, 200px)' });
      // }

    });
  }, [])

  console.log(nombrePlanes, " console log fuera de useState")

  //seteando el contador igual al numero de perfiles del
  // useEffect(() => { 

  // }, [])

  //if para ver cuantos perfiles puede tener el usuario
  // useEffect(() => {

  // }, [])


  return (
    <div className='Profile'>
      <h1 onClick={() => { navigate("/") }} id="titulo">MEMEFLIX</h1>
      <h1 id='quien'>¿Quién Está Viendo?</h1>
      <div className='gridPerfiles' style={{ gridTemplateRows: grid.gridTemplateRows, gridTemplateColumns: grid.gridTemplateColumns }}>

        {/* <h1 style={{ color: 'white' }}>{typeof (nombrePlanes)}</h1> */}

        {/* {nombrePlanes.objects.forEach(n => {
          return (
            <div>
              <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
              <h4>{n}</h4>
            </div>
          )
        })} */}

        {
          nombrePlanes.map(nombre => {
            return (
              <div key={nombre}>
                <TagFaces onClick={() => { navigate(`/home/${idUsuario}/${nombre}`) }} style={{ color: "white", fontSize: '180' }} className="perfil" />
                <h4>{nombre}</h4>
              </div>
            )
          })
        }

        {/* <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Joe</h4>
        </div>
        <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Jack</h4>
        </div>
        <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Mombi</h4>
        </div>
        <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Pablish</h4>
        </div>
        <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Meli</h4>
        </div>
        <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Marie</h4>
        </div>
        <div>
          <TagFaces style={{ color: "white", fontSize: '180' }} className="perfil" />
          <h4>Mike</h4>
        </div> */}



        <div>
          <AddCircle onClick={() => { navigate(`/addprofile/${idUsuario}`) }} style={{ color: "white", fontSize: '180' }} id='agregarPerfil' />
          <h4>Agregar Perfil</h4>
        </div>
      </div>
      <div className="Manejar">
        <button id="btnmanejar">Manejar Perfiles</button>
      </div>
    </div>
  )
}

export default Profile