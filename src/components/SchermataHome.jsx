import Continents from './HomeContinents';
import AnticheMeraviglieMondo from './HomeAnticheMeraviglieMondo';
import ModerneMeraviglieMondo from './HomeModerneMeraviglieMondo';
import MyFooter from './MyFooter';
import GlobalNavbar from './GlobalNavbar';

//prima schermata

const SchermataHome = () =>{

    return (
        <>
            <header id = 'header'>
                <GlobalNavbar />
            </header>

            <main className = 'imgCopertinahome'>

                <div className = 'mainHome'>
                    <h3 className = 'titlePrimary w-75'>
                        In quale continente ti piacerebbe andare?
                    </h3>

                    <a className = 'linkScorrere' href="#footer">Clicca per vedere gli ultimi elementi.</a>            
                </div>
                
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

                <a className = 'linkScorrere' href="#header">Clicca per vedere i primi elementi.</a>

            </main>

            <footer id = 'footer'>
                <MyFooter/>
            </footer>
        </>
    )
}

export default SchermataHome;
