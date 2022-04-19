import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Filas from './Filas';
import Banner from './Banner';
import Nav from './Nav';
import Axios from 'axios';
import { AllInboxOutlined } from '@material-ui/icons';

import ModalAnuncio from './Modals/ANUNCIO/ModalAnuncio'

const Home = () => {

    let { username } = useParams();
    let { profile } = useParams();

    const base_url = "https://image.tmdb.org/t/p/original/";
    const [watched, setWatched] = useState([]);
    const [idPerfil, setIdPerfil] = useState("pe7315");
    const [hayWatched, setHayWatched] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const [modal_anuncio, setmodal_anuncio] = useState(false);
    const [anuncio, set_anuncio] = useState({})

    useEffect(() => {
        Axios.post('http://localhost:3001/retraerIdPerfil', {
            id_usuario: username,
            nombre_perfil: profile,
        }).then((response) => {
            // console.log(response.data[0].id_perfil);
            setIdPerfil(response.data[0].id_perfil);
        });
        Axios.post('http://localhost:3001/retraerPlan', {
            id_usuario: username,
        }).then((response) => {
            if (response.data[0].id_plan == 'pl1') {
                setmodal_anuncio(true);
            }
        });
    }, [])

    useEffect(() => {

        Axios.post('http://localhost:3001/retraerWatched', {
            id_perfil: idPerfil,
        }).then((response) => {
            setWatched(response.data);
        });

        Axios.post('http://localhost:3001/retraerFavorites', {
            id_perfil: idPerfil,
        }).then((response) => {
            setFavorites(response.data);
        });

    }, [idPerfil])

    useEffect(() => {
        getAnuncios()
        // console.log("Se cerro modal");
        setInterval(() => {
            setmodal_anuncio(true);
        }, 60000)
    }, [modal_anuncio])


    useEffect(() => {
        // console.log(watched, "USEEFFECT")
        if (watched.length > 0) {
            setHayWatched(true);
        } else {
            setHayWatched(false);
        }
        // console.log(hayWatched)
    }, [watched])

    const getAnuncios = () => {

        // http://localhost:3001
        Axios.get('http://localhost:3001/retraerAnuncios').then((respuesta_anuncios) => {
            const arr_temp = respuesta_anuncios.data
            // console.log(arr_temp[Math.floor(Math.random() * arr_temp.length)]);
            set_anuncio(arr_temp[Math.floor(Math.random() * arr_temp.length)])
        })

    }

    const handleClick = () => {

    }

    return (
        <div className='Home'>

            <Nav />

            <Banner />

            {modal_anuncio && <ModalAnuncio cerrarModal={setmodal_anuncio} datos_anuncio={anuncio} />}

            <div className='fila'>
                <Filas title="Memeflix Originals" isLargeRow />
                <Filas title="Trending now" />
                {
                    (watched.length > 0) &&
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
                    </div>
                }
                {
                    (favorites.length > 0) &&
                    <div>
                        <h1 className='tituloFilas' style={{ marginLeft: '40px' }}>Favorites</h1>
                        <div className='filas_posters'>
                            {favorites.map(favorites => (
                                <img
                                    key={favorites.id_pelicula}
                                    onClick={() => handleClick(favorites)}
                                    className={`posters ${false && "posterGrande"}`}
                                    src={`${base_url}${false ? favorites.poster_path : favorites.backdrop_path}`}
                                    alt={favorites.titulo} />
                            ))}
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Home