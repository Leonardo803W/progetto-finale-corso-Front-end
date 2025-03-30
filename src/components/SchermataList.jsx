import '../App.css'; 
import { useLocation } from 'react-router-dom';

import ListNavbar from './ListNavbar';
import MainList from './MainList';
import MyFooter from './MyFooter';
import { useState } from 'react';

const SchermataList = () => {
  const location = useLocation();
  const title = location.state?.title; // Extract the title from state
  console.log(title); // Log the title

  const [dove, setDove] = useState('');
  const [chekIn, setChekIn] = useState('');
  const [chekOut, setCheckOut] = useState('');
  const [adulti, setAdulti] = useState(0);
  const [bambini, setBambini] = useState(0);

  const handleSearch = () => {
      // Logic to handle search, e.g. redirect or fetch data based on the state
      console.log({ dove, chekIn, chekOut, adulti, bambini });
  };

  const resetFilters = () => {
      setDove('');
      setChekIn('');
      setCheckOut('');
      setAdulti(0);
      setBambini(0);
  };

  console.log(dove, chekIn, chekOut, adulti, bambini)

  return (
      <>
          <header>
              <ListNavbar 
                  title={title} 
                  dove={dove} 
                  setDove={setDove} 
                  chekIn={chekIn} 
                  setChekIn={setChekIn} 
                  chekOut={chekOut} 
                  setCheckOut={setCheckOut} 
                  adulti={adulti} 
                  setAdulti={setAdulti} 
                  bambini={bambini} 
                  setBambini={setBambini}
                  onSearch={handleSearch}
                  onReset={resetFilters}
              />
          </header>
            
          <main>
        <MainList 
          dove={dove}
          chekIn={chekIn}
          chekOut={chekOut}
          adulti={adulti}
          bambini={bambini}
        />
      </main>

            <footer>
                <MyFooter />
            </footer>
        </>
    );
}

export default SchermataList;
