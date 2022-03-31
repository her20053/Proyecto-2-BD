import React, {useState} from 'react'
import {TagFaces} from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

const AddProfile = () => {

    let navigate = useNavigate();
    let { username } = useParams();

  const [nombrePerfil, setNombrePerfil] = useState("");
  const [url, setUrl] = useState(window.location.href);
  const [activo, setActivo] = useState({disabled: true})
  const [arrayTemp, setArrayTemp] = useState (url.split('/'));
  const [idUsuario, setIdUsuario] = useState(arrayTemp[arrayTemp.length-1]);

  function handleChange(e) { 
    if(e.target.value.length >= 1) { 
      setActivo({disabled: false})
    } else { 
      setActivo({disabled: true})
    }
  }

  function ingresarPerfil() {

    const id_usuario = idUsuario
    const nombre = nombrePerfil;

    navigate(`/profile/${idUsuario}`);
    fetch('http://localhost:3001/agregarPerfil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario, nombre }),
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
    <div className="AddProfile">
        <div className="contAgregarPerfiles">
            <h1 id='tituloAPerfil'>Agregar Perfil</h1>
            <p id = 'parrAPerfil'>Agrega un perfil para otra persona viendo Memeflix.</p>
            <hr id = 'lineaAgregar1'></hr>
            <TagFaces style={{color:"white", fontSize: '150'}} className ="iconAddPerfil"/>
            <input
                type="text"
                placeholder="Nombre"
                id="inputNombrePerfil"
                onInput = {(e) => setNombrePerfil(e.target.value)}
                onChange = {(e) => handleChange(e)}
            />
            <hr id = 'lineaAgregar2'></hr>
            <div className = 'gridBotonesAdd'>
              <button disabled = {activo.disabled} onClick={ingresarPerfil} id = "btnAddCont">Continuar</button>
              <button onClick={() => {navigate(`/profile/${idUsuario}`)}} id = "btnAddCanc">Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default AddProfile