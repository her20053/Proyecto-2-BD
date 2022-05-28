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
    const [info, setinfo] = useState([]);
    const [click, setclick] = useState(false);
    const [input, setinput] = useState("")
    const [haypelis, sethaypelis] = useState(true);

    function ingresarpelicula() {
        let input_usuario = document.getElementById('search_input').value;
        retraerpeliculas1(input_usuario);
        enviar_dato(input_usuario,username)
        console.log(input_usuario)
    }

    const retraerpeliculas1 = async (dato_ingresado_parametro) => {
        const dato_ingresado = dato_ingresado_parametro
        fetch('http://localhost:3001/retraerpelisearch',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dato_ingresado })
            }).then((response) => response.json())
            .then((data) => {
                setPeliculas(data)
                haypelisf()
                console.log(haypelis)
            })
    }
    const enviar_dato = async(dato_ingresado_parametro,usuario_p) =>{
        const busqueda=dato_ingresado_parametro
        const id_usuario=usuario_p
        fetch('http://localhost:3001/sendBusqueda',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id_usuario,busqueda})
            }).then((response) => response.json())
    }

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
    const retraerpeliculas = async (id_pelicula_parametro) => {

        const id_pelicula = id_pelicula_parametro

        fetch('http://localhost:3001/retraerpeli',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_pelicula })
            }).then((response) => response.json())
            .then((data) => {
                setinfo(data[0])
            })
    }


    const handleClick = (peliculas) => {
        if (trailerUrl) {
            setTrailerUrl('');
            setclick(false)
        } else {
            setclick(true)
            retraerpeliculas(peliculas.id_pelicula)
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
    function haypelisf() {
        if (peliculas.length > 0) {
            sethaypelis(true)
        } else {
            sethaypelis(false)
        }
    }
    return (

        <div className='filaSearch'>
            <div className='block_search'>
                <input
                    type="text"
                    placeholder="Buscar"
                    id="search_input"
                    onInput={(e) => setinput(e.target.value)}
                />
                <button className='button_search' onClick={ingresarpelicula}>Buscar</button>
            </div>
            <h1 className='tituloFilas'>{title}</h1>
            <div className="filas_posters">
                {((peliculas.length > 0) ?
                    peliculas.map(pelicula => (
                        <div>
                            <img
                                key={pelicula.id_pelicula}
                                onClick={() => handleClick(pelicula)}
                                className={`posters ${isLargeRow && "posterGrande"}`}
                                src={`${base_url}${isLargeRow ? pelicula.poster_path : pelicula.backdrop_path}`}
                                alt={pelicula.titulo} />

                        </div>


                    )
                    ) : <h2>No hay match para su busqueda.</h2>
                )
                }
            </div>
            {click && info && <div className='barrainfo'>
                <div className='contendor_img'>
                    <img className='img_info' src={`${base_url}${info.backdrop_path}`} alt={info.titulo} />
                </div>
                <h1 className='titulopeli'>{info.titulo}</h1>
                <div className='infopeli'>{info.resumen}</div>
                <button className='button_vd'>+</button>
            </div>}

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}
export default Prueba2;