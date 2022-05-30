import React from 'react'
import { Modal, Button, Divider, ScrollArea, Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import { DatePicker } from '@mantine/dates';
import { Database } from 'tabler-icons-react';

const Top5MasVistos = ({ opened, setOpened }) => {

	const [primeraFecha, onPrimeraFecha] = useState(new Date());
	const [segundaFecha, onSegundaFecha] = useState(new Date());

	const [contenidoMasVisto, setContenidoMasVisto] = useState([]);

	const [rows, setRows] = useState([]);

	const reatrerTop5MasVistos = () => {

		// useEffect(() => {
		// 	const fInicial = inicial
		// 	const fFinal = final

		// 	async function fetchTopGen() {
		// 		fetch('http://localhost:3010/retraerAdmins', {
		// 			method: 'POST',
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 			},
		// 			body: JSON.stringify({ fFinal, fInicial }),
		// 		})
		// 			.then(response => {
		// 				//    setTopGeneros(response.json())
		// 				return response.json()
		// 			})
		// 			.then(data => {
		// 				// alert(data);
		// 				setTopGeneros(data)
		// 			});

		// 	}
		// 	fetchTopGen();
		// }, [])

		// /retraerTop5MasVistos

		const fInicial = primeraFecha.getFullYear() + '-' + primeraFecha.getMonth() + '-' + primeraFecha.getDate()
		const fFinal = segundaFecha.getFullYear() + '-' + segundaFecha.getMonth() + '-' + segundaFecha.getDate()

		console.log(JSON.stringify({ fFinal, fInicial }));

		fetch('http://localhost:3010/retraerTop5MasVistos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fFinal, fInicial }),
		})
			.then(response => { return response.json() })
			.then(data => setContenidoMasVisto(data))

	}

	useEffect(() => {
		if (contenidoMasVisto.length > 0) {
			console.log(contenidoMasVisto)
		}

		let rowsTemp = contenidoMasVisto.map((element) => (
			<tr key={Math.floor(Math.random() * 10000)}>
				<td>{element.hora_inicial}</td>
				<td>{element.id_pelicula}</td>
				<td>{element.fecha_inicial.split('T')[0]}</td>
				<td>{element.cuenta}</td>
			</tr>
		))

		setRows(rowsTemp)

	}, [contenidoMasVisto]);

	return (
		<div>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Porfavor ingrese un rango de fechas:"
			>
				<div className='area_fechas_top_5'>
					<DatePicker
						value={primeraFecha}
						onChange={onPrimeraFecha}
						label="Fecha final"
						placeholder="Elija la fecha final" />
					<DatePicker
						value={segundaFecha}
						onChange={onSegundaFecha}
						label="Fecha de inicio"
						placeholder="Elija la fecha de inicio" />
					<Button leftIcon={<Database />} color="yellow" onClick={() => { reatrerTop5MasVistos() }}>
						Retraer datos
					</Button>
					{
						(contenidoMasVisto.length > 0)
							?
							<div>
								<Divider my="sm" />
								<ScrollArea style={{ height: 350 }}>
									<Table>
										<thead>
											<tr>
												<th>Hora de inicio</th>
												<th>ID pelicula</th>
												<th>Fecha inicial</th>
												<th>Cuenta</th>
											</tr>
										</thead>
										<tbody>
											{rows}
										</tbody>
									</Table>
								</ScrollArea>
							</div>
							:
							null
					}
				</div>
			</Modal>
		</div>
	)
}

export default Top5MasVistos