import '../App.css'; 

import MainList from './MainList';
import MyFooter from './MyFooter';
import GlobalNavbar from './GlobalNavbar';

const SchermataList = () => {

  return (
      <>
          <header id = 'header'>
            <GlobalNavbar/>
          </header>
            
            <main className = 'imgCopertinaList'>

                <a className = 'linkScorrere' href="#footer">Clicca per vedere gli ultimi elementi.</a>            

                <MainList />

                <a className = 'linkScorrere' href="#header">Clicca per vedere i primi elementi.</a>
            </main>

            <footer id = 'footer'>
                <MyFooter />
            </footer>
        </>
    );
}

export default SchermataList;
