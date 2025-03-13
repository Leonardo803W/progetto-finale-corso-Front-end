import Continents from './HomeContinents';
import AnticheMeraviglieMondo from './HomeAnticheMeraviglieMondo';
import ModerneMeraviglieMondo from './HomeModerneMeraviglieMondo';
import MyFooter from './MyFooter';
import GlobalNavbar from './GlobalNavbar';

//prima schermata

const SchermataHome = () =>{

    return (
        <>
            <header>
                <GlobalNavbar />
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