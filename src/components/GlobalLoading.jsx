import { Spinner } from 'react-bootstrap';

const GlobalLoading = () => (

  <div className='caricamentoSchermata'>
      Caricamento del contenuto in corso....
    <Spinner animation="border" variant="success" className="mt-2" />
  </div>
);

export default GlobalLoading;