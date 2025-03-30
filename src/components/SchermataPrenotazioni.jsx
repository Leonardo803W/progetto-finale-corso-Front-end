import GlobalNavbar from './GlobalNavbar';
import MainPrenotazioni from './MainPrenotazioni';
import MyFooter from './MyFooter';

const SchermataPrenotazioni = () => {

    return(
        <>
            <header>
                <GlobalNavbar/>
            </header>

            <main>
                <h2>
                    Le mie prenotazioni
                </h2>

                <MainPrenotazioni/>
            </main>
            
            <footer>
                <MyFooter/>
            </footer>
        </>
    )
}

export default SchermataPrenotazioni;
