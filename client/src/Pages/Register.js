import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import bcrypt from 'bcryptjs'
//import '../App.css'

const Register = () => {

  let navigate = useNavigate();

  const [usuario, setUsuario] = useState(false);
  const [paises, setPaises] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const initialValues = { nombre: "", correo: "", contrasena: "", pais: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    getUsuarios();
  }, []);

  function getUsuarios() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUsuario(data);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
    }
  }, [formErrors])
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!values.nombre) {
      errors.nombre = "El nombre es requerido!";
    }
    if (!values.correo) {
      errors.correo = "El correo es requerido!";
    } else if (!regex.test(values.correo)) {
      errors.correo = "El correo no es valido!"
    }
    // if (!values.pais) {
    //   errors.pais = "El pais es requerido!";
    // }
    if (!values.contrasena) {
      errors.contrasena = "La contraseña es requerida!";
    } else if (values.contrasena.length < 8) {
      errors.contrasena = "Minimo 8 caracteres!"
    }

    return errors;
  }


  function ingresarUsuario() {
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if(Object.keys(formErrors).length === 0 && isSubmit) {

      let id = 'u' + Math.floor(Math.random() * 100000)
      let nombre_persona = document.getElementById('nombre').value;
      let correo = document.getElementById('correo').value;
      let lugar = document.getElementById('caja_paises').value;
      let contrasena = bcrypt.hashSync(document.getElementById('contrasena').value, bcrypt.genSaltSync());
      navigate(`/plan/${id}`);
      fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nombre_persona, correo, lugar, contrasena }),
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          alert(data);
          // getUsuarios();
        });

    }
  }

  return (

    <div className='Register'>
      <h1 onClick={() => { navigate("/") }} id="titulo">MEMEFLIX</h1>
      <button onClick={() => { navigate("/login") }} id="inicioSesion">Iniciar Sesion</button>
      <div className="box" onSubmit={handleSubmit}>

        <h1>Registrar Usuario</h1>
        <div className="grid">
          <div>
            <input type="text" name="nombre" placeholder="Nombre" id="nombre" value={formValues.nombre} onChange={handleChange} />
            <p>{formErrors.nombre}</p>
          </div>
          <div>
            <select id="caja_paises">
              {/* <option value="8">Seleccionar pais</option> */}
              {options.map(opcion => {

                {/* console.log(opcion.label) */ }
                return (
                  <option value={opcion.label} >{opcion.label}</option>
                )

              })}
            </select>
            {/* <select type="text" name="pais" placeholder="País" id="pais" options={options} value={paises} onChange={handleOnChangePais} /> */}
            {/* <input type="text" name="pais" placeholder="País" id="pais" value = {formValues.pais} onChange={handleChange}/> */}
            <p>{formErrors.pais}</p>
          </div>

          <div>
            <input type="text" name="correo" placeholder="Correo Electrónico" id="correo" value={formValues.correo} onChange={handleChange} />
            <p>{formErrors.correo}</p>
          </div>
          <div>
            <input type="password" name="contrasena" placeholder="Contraseña" id="contrasena" value={formValues.contrasena} onChange={handleChange} />
            <p>{formErrors.contrasena}</p>
          </div>

        </div>
        <button onClick={ingresarUsuario}>Crear Cuenta</button>
        {/* onClick={ingresarUsuario} */}
      </div>
    </div>
  );
}
export default Register;
