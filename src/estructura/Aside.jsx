import est from './Aside.module.css' 
import React from "react";
import Clima from '../componentes/Clima';

const Aside =()=> {

    return ( 
        <aside className={est.general}>
            <h2>Clima actual</h2>
            <Clima />
            <hr />
            <h2>Publicidad</h2>
            <div className={est.pubicidad}>
             {/* Aquí podés agregar banners, imágenes o enlaces más adelante */}
            </div>
        </aside>
    )
}

export default Aside
