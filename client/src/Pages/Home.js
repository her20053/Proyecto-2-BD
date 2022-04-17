import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Filas from './Filas';
import Banner from './Banner';
import Nav from './Nav';
import Axios from 'axios';
import { AllInboxOutlined } from '@material-ui/icons';

const Home = () => {

    let { username } = useParams();
    let { profile } = useParams();

    const base_url = "https://image.tmdb.org/t/p/original/";
    const [watched, setWatched] = useState([]);
    const [idPerfil, setIdPerfil] = useState("pe7315");
    const [hayWatched, setHayWatched] = useState(false)

    useEffect(() => {
        Axios.post('http://localhost:3001/retraerIdPerfil', {
            id_usuario: username,
            nombre_perfil: profile,
        }).then((response) => {
            // console.log(response.data[0].id_perfil);
            setIdPerfil(response.data[0].id_perfil);
        });
    }, [])

    useEffect(() => {

        Axios.post('http://localhost:3001/retraerWatched', {
            id_perfil: idPerfil,
        }).then((response) => {
            setWatched(response.data);
        });

    }, [idPerfil])


    useEffect(() => {
        console.log(watched, "USEEFFECT")
        if (watched.length > 0) {
            setHayWatched(true);
        } else {
            setHayWatched(false);
        }
        console.log(hayWatched)
    }, [watched])

    const handleClick = () => {

    }

    return (
        <div className='Home'>

            <Nav/>

            <Banner />

            <div className='fila'>
                <Filas title="Memeflix Originals" isLargeRow />
                <Filas title="Trending now" />
                {
                    hayWatched ?
                        <div>
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
                        </div> : null
                }
            </div>

        </div>
    )
}

export default Home