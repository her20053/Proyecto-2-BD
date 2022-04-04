import React, { useEffect, useState } from 'react'
import { TagFaces, Search } from '@material-ui/icons';

const Nav = () => {

    const [show, handleShow] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);

    console.log(window.scrollY)

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