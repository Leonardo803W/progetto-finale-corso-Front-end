import GlobalNavbar from './GlobalNavbar';
import Mainpreferiti from './Mainpreferiti';
import MyFooter from './MyFooter';

const SchermataFavoriti = () => {

    return(
        <>
            <header>
                <GlobalNavbar/>
            </header>

            <main className = 'imgCopertinaFavoriti'>
                <h2 className = 'titlePrimary'>
                    I miei preferiti
                </h2>

                <Mainpreferiti/>
            </main>
            
            <footer>
                <MyFooter/>
            </footer>
        </>
    )
}

export default SchermataFavoriti;
