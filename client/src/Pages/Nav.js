import React, { useEffect, useState } from 'react'
import { TagFaces, Search } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

const Nav = () => {
    let navigate = useNavigate();
    let { username } = useParams();
    let { profile } = useParams();
    const [show, handleShow] = useState(false);
    console.log(username)

    const handleScroll = () => {
        // console.log(window.scrollY)
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


    return (
        <div className={`Nav ${show && "Nav_black"}`}>
            <h2 onClick={() => { navigate(`/home/${username}/${profile}`) }} id="titulo">MEMEFLIX</h2>
            <div className='gridNav'>
                <h4 onClick={() => { navigate(`/home/${username}/${profile}`) }} >Home</h4>
                <h4>Favorites</h4>
            </div>
            <Search id='searchNav' onClick={() => { navigate(`/home/search/${username}/${profile}`) }} style={{ color: "white", fontSize: '35', objectFit: "contain" }} />
            <TagFaces id='avatarNav' style={{ borderRadius: "4px", background: "#ffba08", color: "white", fontSize: '35', objectFit: "contain" }} />
        </div>
    )
}

export default Nav