import { Spinner } from 'react-bootstrap'

const GlobalLoading = () => (

    <p className = 'caricamentoSchermata'>
        Caricamento del contenuto in corso....
        <Spinner animation="border" variant="success" className="mt-2" />
    </p>
  
)

export default GlobalLoading
