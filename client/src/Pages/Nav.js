import React, { useEffect, useState } from 'react'
import { TagFaces, Search } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from '@mantine/core';
import Axios from 'axios';
import { Menu, Divider, Text, Button } from '@mantine/core';
import { Settings, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react';

const Nav = () => {
    let navigate = useNavigate();
    let { username } = useParams();
    let { profile } = useParams();

    const [show, handleShow] = useState(false);
    const [nombresperfiles, setnombresperfiles] = useState([]);
    const [value_select, setValueSelect] = useState('');

    const handleScroll = () => {
        // console.log(window.scrollY)
        if (window.scrollY > 100) {
            handleShow(true);
        } else handleShow(false);
    }

    useEffect(() => {

        Axios.post('http://localhost:3001/retraerPerfiles', {
            id_usuario: username,
        }).then((response) => {
            // setNombrePlanes(response.data.map(m => m.nombre))
            // console.log(response.data.map(m => m.nombre));
            setnombresperfiles(response.data.map(m => {

                return { value: m.nombre, label: m.nombre }
                // { value: 'react', label: 'React' },

            }))
        });

        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    useEffect(() => {
        console.log(value_select);
        // window.location.reload(false);
        if (value_select != '') {
            navigate(`/home/${username}/${value_select}`);
            window.location.reload(false);
        }
        // navigate(`/home/${username}/${value_select}`);

    }, [value_select]);

    const handleClickPlan = () => {
        navigate(`/updateplan/${username}`);
    }
    const handleClickLogout = () => {
        navigate('/login')
    }



    return (
        <div className={`Nav ${show && "Nav_black"}`}>
            <h2 onClick={() => { navigate(`/home/${username}/${profile}`) }} id="titulo">MEMEFLIX</h2>
            <div className='gridNav'>
                <h4 onClick={() => { navigate(`/home/${username}/${profile}`) }} >Home</h4>
                <h4>Favorites</h4>
            </div>
            <Search id='searchNav' onClick={() => { navigate(`/home/search/${username}/${profile}`) }} style={{ color: "white", fontSize: '35', objectFit: "contain" }} />
            <Menu gutter={1} position="right" id='navMenuOptions' control={<Button color="yellow">Opciones</Button>}>
                <Menu.Label>Cuenta</Menu.Label>
                <Menu.Item
                    icon={<MessageCircle size={14} />}
                    onClick={handleClickPlan}
                >Cambiar plan</Menu.Item>
                <Menu.Item
                    color="red"
                    icon={<ArrowsLeftRight size={14} />}
                    onClick={handleClickLogout}
                >Logout</Menu.Item>
            </Menu>
            <Select
                value={value_select}
                placeholder={profile}
                data={nombresperfiles}
                onChange={setValueSelect}
                id='avatarNav'
            />
            {/* <TagFaces id='avatarNav' style={{ borderRadius: "4px", background: "#ffba08", color: "white", fontSize: '35', objectFit: "contain" }} /> */}
        </div>
    )
}

export default Nav