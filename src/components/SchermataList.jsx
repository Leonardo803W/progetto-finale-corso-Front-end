import '../App.css'; 
import ListNavbar from './ListNavbar';

import MainList from './MainList';
import MyFooter from './MyFooter';

const SchermataList = () => {
  
  return (
    <>
      <header>
       <ListNavbar/>
      </header>
      
      <main>
        <MainList/>
      </main>

      <footer>
        <MyFooter/>
      </footer>
    </>
  );
}

export default SchermataList;