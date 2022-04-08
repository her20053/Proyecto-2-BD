import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import movieTrailer from 'movie-trailer';

const Prueba2 = ({ title, isLargeRow }) => {

    let { username } = useParams();
    let { profile } = useParams();

    const base_url = "https://image.tmdb.org/t/p/original/";
    const [peliculas, setPeliculas] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [idPerfil, setIdPerfil] = useState("");


    // useEffect(() => {
    //     async function fetchData() {
    //         const request = await axios.get(fetchurl);
    //         setPeliculas(request.data.results)
    //         console.log(request.data.results)
    //         return request;
    //     }
    //     fetchData();
    // }, [fetchurl]);
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
        async function fetchPelis() {
            fetch('http://localhost:3001/retraerPelis'
            ).then((response) => {
                return response.json();
            }).then((respuesta) => {
                // console.log(respuesta)
                setPeliculas(respuesta);
            });
        }
        fetchPelis();
    }, [])

    const opts = {
        height: "900",
        width: "100%",
        plaerVars: {
            autoplay: 1,
        },
    };

    async function sendWatched(id_pelicula) {
        // console.log(id_pelicula);
        Axios.post('http://localhost:3001/sendWatched', {
            id_pelicula: id_pelicula,
            id_perfil: idPerfil,
        }).then((response) => {

        });
    }

    const handleClick = (peliculas) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(peliculas?.titulo || "")
                .then(url => {
                    sendWatched(peliculas.id_pelicula);
                    const urlParams = new URLSearchParams(new URL(peliculas.url).search);
                    console.log(peliculas.url)
                    setTrailerUrl(urlParams.get('v'));
                    console.log(trailerUrl)
                }).catch(error => console.log(error))
        }
    }

    return (
        <div className='fila'>
            <h1 className='tituloFilas'>{title}</h1>
            <div className="filas_posters">
                {peliculas.map(peliculas => (
                    <img
                        key={peliculas.id_pelicula}
                        onClick={() => handleClick(peliculas)}
                        className={`posters ${isLargeRow && "posterGrande"}`}
                        src={`${base_url}${isLargeRow ? peliculas.poster_path : peliculas.backdrop_path}`}
                        alt={peliculas.titulo} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Prueba2;