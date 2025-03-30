import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SchermataHome from './components/SchermataHome';
import SchermataList from './components/SchermataList';
import SchermataDettaglio from './components/SchermataDettaglio';
import SchermataFavoriti from './components/SchermataFavoriti';
import SchermataCreazione from './components/SchermataCreazione';
import SchermataPrenotazioni from './components/SchermataPrenotazioni';

function App() {

  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SchermataHome />} />
          <Route path = "list" element = {<SchermataList />} />
          <Route path="/dettaglio/:id" element={<SchermataDettaglio />} />
          <Route path="/preferiti" element={<SchermataFavoriti />} />
          <Route path="/create" element={<SchermataCreazione />} />
          <Route path="/prenotazioni" element={<SchermataPrenotazioni />} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
