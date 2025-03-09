import '../App.css'; 
import NavbarList from './ListNavbar';
import MainList from './MainList';
import MyFooter from './MyFooter';

const SchermataList = () => {
  
  return (
    <>
      <header>
        <NavbarList />
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