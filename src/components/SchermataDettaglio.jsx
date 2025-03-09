import NavbarList from './ListNavbar';
import MainDettaglio from './MainDettaglio';
import MyFooter from './MyFooter';

const SchermataDettaglio = () => {
  
  return (
    <>
        <header>
            <NavbarList/>
        </header>

        <main>
          <MainDettaglio/>
        </main>

        <footer>
          <MyFooter/>
        </footer>
    </>
  );
}

export default SchermataDettaglio;