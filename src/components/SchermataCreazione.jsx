import GlobalNavbar from './GlobalNavbar';
import MainCreazione from './MainCreazione';
import MainDettaglio from './MainDettaglio';
import MyFooter from './MyFooter';

const SchermataCreazione = () => {
  
  return (
    <>
        <header>
            <GlobalNavbar/>
        </header>

        <main>
            <MainCreazione/>
        </main>

        <footer>
          <MyFooter/>
        </footer>
    </>
  );
}

export default SchermataCreazione;
