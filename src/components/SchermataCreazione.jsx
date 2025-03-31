import GlobalNavbar from './GlobalNavbar';
import MainCreazione from './MainCreazione';
import MyFooter from './MyFooter';

const SchermataCreazione = () => {

  return (
    <>
        <header id = 'header'>
            <GlobalNavbar/>
        </header>

        <main className='backgroundCreate'>

          <div className = 'd-flex justify-content-around align-items-center'>
            <h3 className = 'titlePrimary w-75'>
              Benvenuto nella pagina della creazione Admin!
            </h3>

            <a className = 'linkScorrere' href="#footer">Clicca per vedere gli ultimi elementi.</a>            
          </div>


            <MainCreazione/>
            
            <a className = 'linkScorrere' href="#header">Clicca per vedere i primi elementi.</a>
        </main>

        <footer id = 'footer'>
          <MyFooter/>
        </footer>
    </>
  );
}

export default SchermataCreazione;
