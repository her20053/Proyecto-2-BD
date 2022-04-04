import React, { useEffect, useState } from 'react'
import { TagFaces, Search } from '@material-ui/icons';

const Nav = () => {

    const [show, handleShow] = useState(false);

    const handleScroll = () => {
        console.log(window.scrollY)
        if (window.scrollY > 100) {
            handleShow(true);
        } else handleShow(false);
    }

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const handleKeyDown = (event) => {
        console.log('A key was pressed', event.keyCode);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // cleanup this component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    return (
        <div className={`Nav ${show && "Nav_black"}`}>
            <h2 id="titulo">MEMEFLIX</h2>
            <div className='gridNav'>
                <h4>Home</h4>
                <h4>Movies</h4>
                <h4>Shows</h4>
                <h4>Favorites</h4>
            </div>
            <Search id='searchNav' style={{ color: "white", fontSize: '35', objectFit: "contain" }} />
            <TagFaces id='avatarNav' style={{ borderRadius: "4px", background: "#ffba08", color: "white", fontSize: '35', objectFit: "contain" }} />
        </div>
    )
}

export default Nav