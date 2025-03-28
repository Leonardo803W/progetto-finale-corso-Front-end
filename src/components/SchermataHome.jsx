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

            <main className = 'imgCopertina'>
                <h3 className = 'titlePrimary'>
                    In quale continente ti piacerebbe andare?
                </h3>
                <Continents />
                <hr />

                <h3 className = 'titlePrimary'>
                Quale meraviglia del mondo antico ti piacerebbe visitare?
                </h3>
                <AnticheMeraviglieMondo />
                <hr />

                <h3 className = 'titlePrimary'>
                Quale meraviglia del mondo moderno ti piacerebbe visitare?
                </h3>
                <ModerneMeraviglieMondo />
            </main>

            <footer>
                <MyFooter/>
            </footer>
        </>
    )
}

export default SchermataHome;
