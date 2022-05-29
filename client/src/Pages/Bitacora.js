import React, { useState, useEffect } from 'react'
import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Bitacora = () => {

  const navigate = useNavigate()
  const [bitacora, setBitacora] = useState([])

  useEffect(() => {
      async function fetchBitacora() {
          fetch('http://localhost:3010/retraerBitacora'
          ).then((response) => {
              return response.json();
          }).then((respuesta) => {
              // console.log(respuesta)
              setBitacora(respuesta);
          });
      }
    fetchBitacora();
    
  }, [])

  useEffect(() => {
    // console.log(bitacora)
    for (let i = 0; i < bitacora.length; i++) {
      // console.log(bitacora[i].id_administrador)
    }
  }, [bitacora])

  const rows = bitacora.map((element) => (
    <tr key={element.id_modifcacion}>
      <td>{element.id_modifcacion}</td>
      <td>{element.id_administrador}</td>
      <td>{element.tipo_modificacion}</td>
      <td>{element.tabla_modificada}</td>
      <td>{element.fecha_modificacion}</td>
      <td>{element.hora_modificacion}</td>
    </tr>
  ));

  return (
    <div className="BitacoraContainer">
      <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>
       <Table style={{color: "white"}}>
        <thead>
          <tr>
            <th>ID Modificacion</th>
            <th>ID Administrador</th>
            <th>Tipo Modificacion</th>
            <th>Tabla Modificada</th>
            <th>Fecha Modificacion</th>
            <th>Hora Modificacion</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </Table>
    </div>
  )
}

export default Bitacora