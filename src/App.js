import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SchermataHome from './components/SchermataHome';
import SchermataList from './components/SchermataList';
import SchermataDettaglio from './components/SchermataDettaglio';
import SchermataFavoriti from './components/SchermataFavoriti';

function App() {

  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SchermataHome />} />
          <Route path = "list" element = {<SchermataList />} />
          <Route path="/dettaglio/:id" element={<SchermataDettaglio />} />
          <Route path="/favoriti" element={<SchermataFavoriti />} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;