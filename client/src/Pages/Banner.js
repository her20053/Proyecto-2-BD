import React, { useEffect, useState } from 'react'
import { PlayArrow, Info } from '@material-ui/icons';
import axios from './axios';

const Banner = () => {

    const API_KEY = '220ceb671f48c61d05bf9207f8306daa';
    const [pelicula, setPelicula] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`)
            setPelicula(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, [])

    return (
        <header className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${pelicula?.backdrop_path})`,
                backgroundPosition: "center center"
            }}
        >
            <div className='contenidoBanner'>
                <h1 className='tituloBanner'>{pelicula?.title || pelicula?.name || pelicula?.original_name}</h1>

                <div className='botonesBanner'>
                    <button className='botonBanner1'>
                        <PlayArrow />
                        Play</button>
                    <button className='botonBanner2'>
                        <Info />
                        Mi Lista</button>
                </div>

                <h1 className='bannerDesc'>{pelicula?.overview}</h1>

            </div>

            <div className='bannerFade'></div>

        </header>
    )
}

export default Banner