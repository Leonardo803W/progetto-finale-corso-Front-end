import GlobalNavbar from './GlobalNavbar';
import Mainpreferiti from './Mainpreferiti';
import MyFooter from './MyFooter';

const SchermataFavoriti = () => {

    return(
        <>
            <header>
                <GlobalNavbar/>
            </header>

            <main>
                <h2>
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
