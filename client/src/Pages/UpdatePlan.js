import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePlanes = () => {

    let navigate = useNavigate();
    let { username } = useParams();

    const [appState, changeState] = useState({
        activeObject: null,
        objects: [{ id: 0, text: "Basico" }, { id: 1, text: "Estandar" }, { id: 2, text: "Avanzado" }]
    });

    const [activo, setActivo] = useState({ disabled: true });
    const [basico, setbasico] = useState({ color: 'white' })
    const [estandar, setEstandar] = useState({ color: 'white' })
    const [avanzado, setAvanzado] = useState({ color: 'white' })
    const [plan, setPlan] = useState('')


    function toggleActive(index) {

        changeState({ ...appState, activeObject: appState.objects[index] });
        setActivo({ disabled: false });

        if (index === 0) {
            setPlan('pl1');

            setbasico({ color: '#ffba08' })
            setAvanzado({ color: 'white' })
            setEstandar({ color: 'white' })

        } else if (index === 1) {
            setPlan('pl2');

            setEstandar({ color: '#ffba08' })
            setbasico({ color: 'white' })
            setAvanzado({ color: 'white' })

        } else if (index === 2) {
            setPlan('pl3');

            setAvanzado({ color: '#ffba08' })
            setbasico({ color: 'white' })
            setEstandar({ color: 'white' })
        }
        return index
    }

    function toggleActiveStyles(index) {
        if (appState.objects[index] === appState.activeObject) {
            return "planes activo"
        } else {
            return "planes inactivo"
        }
    }


    function ingresarPlan() {

        let url = window.location.href
        let arrayTemp = url.split('/')

        var today = new Date();

        let id = 's' + Math.floor(Math.random() * 100000)
        let id_usuario = arrayTemp[arrayTemp.length - 1]
        let valido_hasta = (today.getFullYear() + 1) + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let fecha_inicio = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        navigate(`/login`);
        fetch('http://localhost:3001/suscripciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, id_usuario, plan, valido_hasta, fecha_inicio }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                // getUsuarios();
            });
    }


    return (
        <div className='Planes'>
            <h1 onClick={() => { navigate("/") }} id="titulo">MEMEFLIX</h1>
            <div className='contenedorPlanes'>
                <h2 id='eligePlan'>¡Elige el plan correcto para ti!</h2>
                <ul id='listaPlanes'>
                    <li>Mira todas las series y películas que quieras.</li>
                    <li>Recomendaciones solo para ti.</li>
                    <li>Cambia o cancela tu plan en cualquier momento.</li>
                </ul>
                <div className='gridPlanes'>
                    <div id='plan' key={0} className={toggleActiveStyles(0)} onClick={() => { toggleActive(0) }}>Basico</div>
                    <div id='plan' key={1} className={toggleActiveStyles(1)} onClick={() => { toggleActive(1) }}>Estandar</div>
                    <div id='plan' key={2} className={toggleActiveStyles(2)} onClick={() => { toggleActive(2) }}>Avanzado</div>
                </div>
                <div className='gridDeGrids'>
                    <div className='gridInfo'>
                        <div id='info'>Costo Mensual</div>
                        <hr id='lineaInfo'></hr>
                        <div id='info'>Calidad del Video</div>
                        <hr id='lineaInfo'></hr>
                        <div id='info'>Resolución</div>
                        <hr id='lineaInfo'></hr>
                        <div id='info'>Número de perfiles</div>
                        <hr id='lineaInfo'></hr>
                        <div id='info'>Ver contenido en cualquier dispositivo</div>
                    </div>
                    <div className='gridBasico'>
                        <div id='txtBasico' style={{ color: basico.color }}>$0.00</div>
                        <hr ></hr>
                        <div id='txtBasico' style={{ color: basico.color }}>Normal</div>
                        <hr ></hr>
                        <div id='txtBasico' style={{ color: basico.color }}>480p</div>
                        <hr></hr>
                        <div id='txtBasico' style={{ color: basico.color }}>1</div>
                        <hr></hr>
                        <div id='txtBasico' style={{ color: basico.color }}>Si</div>
                    </div>
                    <div className='gridEstandar'>
                        <div id='txtEstandar' style={{ color: estandar.color }}>$4.99</div>
                        <hr ></hr>
                        <div id='txtEstandar' style={{ color: estandar.color }}>Buena</div>
                        <hr ></hr>
                        <div id='txtEstandar' style={{ color: estandar.color }}>1080p</div>
                        <hr ></hr>
                        <div id='txtEstandar' style={{ color: estandar.color }}>4</div>
                        <hr ></hr>
                        <div id='txtEstandar' style={{ color: estandar.color }}>Si</div>
                    </div>
                    <div className='gridAvanzado'>
                        <div id='txtAvanzado' style={{ color: avanzado.color }}>$7.99</div>
                        <hr ></hr>
                        <div id='txtAvanzado' style={{ color: avanzado.color }}>Excelente</div>
                        <hr ></hr>
                        <div id='txtAvanzado' style={{ color: avanzado.color }}>4K+HDR</div>
                        <hr ></hr>
                        <div id='txtAvanzado' style={{ color: avanzado.color }}>8</div>
                        <hr ></hr>
                        <div id='txtAvanzado' style={{ color: avanzado.color }}>Si</div>
                    </div>
                </div>
                <div id="Continuar">
                    <button disabled={activo.disabled} onClick={() => { ingresarPlan() }} id='btnContinuar'>Continuar</button>
                </div>
            </div>
        </div>
    )
}

export default UpdatePlanes