import YouTube from 'react-youtube';
import React, { useEffect, useState } from 'react';
import axios from './axios';
import movieTrailer from 'movie-trailer';

const Prueba2 = ({ title, fetchurl, isLargeRow }) => {

    const base_url = "https://image.tmdb.org/t/p/original/";
    const [peliculas, setPeliculas] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchurl);
            setPeliculas(request.data.results)
            console.log(request.data.results[1].backdrop_path)
            return request;
        }
        fetchData();
    }, [fetchurl]);

    const opts = {
        height: "900",
        width: "100%",
        plaerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (peliculas) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(peliculas?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(url)
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
                        key={peliculas.id}
                        onClick={() => handleClick(peliculas)}
                        className={`posters ${isLargeRow && "posterGrande"}`}
                        src={`${base_url}${isLargeRow ? peliculas.poster_path : peliculas.backdrop_path}`}
                        alt={peliculas.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Prueba2