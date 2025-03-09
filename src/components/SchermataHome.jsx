import React, { useState } from 'react';

import Navbar from './HomeNavbar';
import Continents from './HomeContinents';
import AnticheMeraviglieMondo from './HomeAnticheMeraviglieMondo';
import ModerneMeraviglieMondo from './HomeModerneMeraviglieMondo';
import MyFooter from './MyFooter';


const SchermataHome = () =>{

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <Continents />
                <hr />
                <AnticheMeraviglieMondo />
                <hr />
                <ModerneMeraviglieMondo />
            </main>

            <footer>
                <MyFooter/>
            </footer>
        </>
    )
}

export default SchermataHome;