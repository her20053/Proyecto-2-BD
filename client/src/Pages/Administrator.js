import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

// Importando todos los modales requeridos para la pagina:


// Columnas de herramientas para peliculas
import ModalAgregarPelicula from './Modals/agregar-pelicula-folder/ModalAgregarPelicula'
import ModalModificarPelicula from './Modals/modificar-pelicula-folder/ModalModificarPelicula'
import ModalCorregirPelicula from './Modals/corregir-pelicula-folder/ModalCorregirPelicula'
import ModalAgregarAnunciante from './Modals/agregar-anunciante-folder/ModalAgregarAnunciante'
import ModalEliminarAnunciante from './Modals/eliminar-anunciante-folder/ModalEliminarAnunciante'
import ModalAgregarUsuario from './Modals/Agregar-usuario/ModalAgregarUsuario'
import ModalModificarUsuario from './Modals/modificar-usuario-folder/modificarUsuario'
import TopGenerosVistos from './Modals/top-generos-vistos-folder/topGenerosVistos'
import CantidadCategoria from './Modals/cantidad-categoria-folder/cantidadCategoria'
import TopActDic from './Modals/topActDic-folder/topActDic'


const Administrator = () => {

    let navigate = useNavigate();


    // Columnas de herramientas para peliculas
    const [modal_map, setmodal_map] = useState(false);
    const [modal_mmp, setmodal_mmp] = useState(false);
    const [modal_mcp, setmodal_mcp] = useState(false);
    const [modal_maa, setmodal_maa] = useState(false);
    const [modal_mea, setmodal_mea] = useState(false);
    const [modal_agu, setmodal_agu] = useState(false);
    const [modal_mmu, setmodal_mmu] = useState(false);
    const [modal_top, setmodal_top] = useState(false);
    const [modal_cat, setmodal_cat] = useState(false);
    const [modal_act, setmodal_act] = useState(false);


    return (
        <div className='Admin'>
            <h1 onClick={() => { navigate("/") }} id="titulo">ADMINFLIX</h1>

            {modal_map && <ModalAgregarPelicula cerrarModal={setmodal_map} />}
            {modal_mmp && <ModalModificarPelicula cerrarModal={setmodal_mmp} />}
            {modal_mcp && <ModalCorregirPelicula cerrarModal={setmodal_mcp} />}
            {modal_maa && <ModalAgregarAnunciante cerrarModal={setmodal_maa} />}
            {modal_mea && <ModalEliminarAnunciante cerrarModal={setmodal_mea} />}
            {modal_agu && <ModalAgregarUsuario cerrarModal={setmodal_agu} />}
            {modal_mmu && <ModalModificarUsuario cerrarModal={setmodal_mmu} />}
            {modal_top && <TopGenerosVistos cerrarModal={setmodal_top} />}
            {modal_cat && <CantidadCategoria cerrarModal={setmodal_cat} />}
            {modal_act && <TopActDic cerrarModal={setmodal_act} />}

            <div className='contenido-admin'>
                <div className='caja-opciones-admin'>
                    <h1>Herramientas de peliculas</h1>
                    <button id="raise" onClick={() => { setmodal_map(true); }}>Agregar pelicula</button>
                    <button id="raise" onClick={() => { setmodal_mmp(true); }}>Modificar pelicula</button>
                    <button id="raise" onClick={() => { setmodal_mcp(true); }}>Corregir pelicula</button>
                    <button id="raise" onClick={() => { setmodal_maa(true); }}>Agregar anunciante</button>
                    <button id="raise" onClick={() => { setmodal_mea(true); }}>Eliminar anunciante</button>
                </div>
                <div className='caja-opciones-admin'>
                    <h1>Herramientas de usuarios</h1>
                    <button id="raise" onClick={() => { setmodal_agu(true); }}>Agregar usuario</button>
                    <button id="raise" onClick={() => { setmodal_mmu(true); }}>Modificar usuario</button>
                    <button id="raise">Corregir direccion de usuario</button>
                    <button id="raise">Desactivar perfil</button>
                    <button id="raise">Activar perfil</button>
                </div>
                <div className='caja-opciones-admin'>
                    <h1>Reportes e info de peliculas</h1>
                    <button id="raise" onClick={() => { setmodal_top(true); }}>Los 10 generos mas vistos</button>
                    <button id="raise" onClick={() => { setmodal_cat(true); }}>Cantidad de reproducciones por categoria</button>
                    <button id="raise" onClick={() => { setmodal_act(true); }}>Top 10 actores y directores</button>
                    <button id="raise">Cantidad de cuentas avanzadas en 6 meses</button>
                    <button id="raise">Fecha especifica, ¿cual es la hora pico?</button>
                </div>
            </div>
        </div >
    )
}

export default Administrator