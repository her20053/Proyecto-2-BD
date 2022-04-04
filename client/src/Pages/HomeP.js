import React from 'react';
import Filas from './Filas';
import Banner from './Banner';
import Nav from './Nav';

const Prueba1 = () => {

    const API_KEY = '220ceb671f48c61d05bf9207f8306daa';

    return (
        <div className='HomeP'>

            <Nav />

            <Banner />

            <Filas title="Memeflix Originals" fetchurl={`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`} isLargeRow />
            <Filas title="Trending now" fetchurl={`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`} />
            <Filas title="Top Rated" fetchurl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`} />
            <Filas title="Action Movies" fetchurl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`} />
            <Filas title="Comedy Movies" fetchurl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`} />
            <Filas title="Horror Movies" fetchurl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`} />
            <Filas title="Romance Movies" fetchurl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`} />
            <Filas title="Documentaries" fetchurl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`} />
        </div>
    )
}

export default Prueba1