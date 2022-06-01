import { useState } from 'react';
import Nav from './Nav';
import Filas from './Filas_search';
const Search =()=>{
    return(
        <div className="Search">
            <Nav/>
            <div className='fila' id='filaBusquda'>
                <Filas title="Search" isLargeRow />
            </div>
        </div>
        
    )

}
export default Search