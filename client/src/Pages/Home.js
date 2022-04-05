import React, { useState, useEffect } from 'react';
import Filas from './Filas';
import Banner from './Banner';
import Nav from './Nav';
import Axios from 'axios';

const Home = () => {

    const base_url = "https://image.tmdb.org/t/p/original/";
    const url = window.location.href
    const arrayTemp = url.split('/')
    const nombrePerfil = arrayTemp[arrayTemp.length - 1]
    const idUsuario = arrayTemp[arrayTemp.length - 2]
    const [watched, setWatched] = useState([]);

    useEffect(() => {

        Axios.post('http://localhost:3001/retraerWatched', {
            id_usuario: idUsuario,
            nombre_perfil: nombrePerfil,
        }).then((response) => {
            // console.log(response.data);
            setWatched(response.data);
        });

    }, [])


    useEffect(() => {
        console.log(watched, "USEEFFECT")
    }, [watched])

    const handleClick = () => {

    }

    return (
        <div className='Home'>

            <Nav />

            <Banner />

            <div className='fila'>
                <Filas title="Memeflix Originals" isLargeRow />
                <Filas title="Trending now" />
                <h1 className='tituloFilas' style={{ marginLeft: '40px' }}>Watch Again</h1>
                <div className='filas_posters'>
                    {watched.map(watched => (
                        <img
                            key={watched.id_pelicula}
                            onClick={() => handleClick(watched)}
                            className={`posters ${false && "posterGrande"}`}
                            src={`${base_url}${false ? watched.poster_path : watched.backdrop_path}`}
                            alt={watched.titulo} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home