import React, { useEffect, useState } from 'react';
import GlobalLoading from './GlobalLoading'; // Importa il tuo componente di caricamento
import GlobalError from './GlobalError'; // Importa il tuo componente di errore

const MainCreazione = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [windowOpen, setWindowOpen] = useState(false);
    const [windowOpenModify, setWindowOpenModify] = useState(false);
    const [currentId, setCurrentId] = useState(null); // Stato per tenere traccia dell'ID dell'elemento da modificare

    // Stato per i campi di input
    const [newTitle, setNewTitle] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newState, setNewState] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newProvincia, setNewProvincia] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch('http://localhost:8080/api/viaggi/fetchall', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) { return <GlobalLoading />; }
    if (error) { return <GlobalError />; }

    const handleModifyOpen = (item) => {
        setNewTitle(item.titolo);
        setNewImageUrl(item.image);
        setNewState(item.stato);
        setNewCity(item.citta);
        setNewProvincia(item.provincia);
        setNewDescription(item.descrizione);
        setNewPrice(item.prezzo);
        setCurrentId(item.id); // Imposta l'ID dell'elemento da modificare
        setWindowOpenModify(true); // Apri la finestra di modifica
    };

    const handleModify = async () => {
        if (newTitle && newDescription) {
            try {
                const response = await fetch(`http://localhost:8080/api/viaggi/modifyById/${currentId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        titolo: newTitle, 
                        image: newImageUrl,
                        stato: newState, 
                        provincia: newProvincia, 
                        citta: newCity, 
                        descrizione: newDescription,
                        prezzo: newPrice, 
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const updatedItem = await response.json(); // Assicurati di ricevere l'oggetto aggiornato
                setData(prevData => prevData.map(item => item.id === currentId ? updatedItem : item));
                resetFields();
                setWindowOpenModify(false); // Chiude la finestra di modifica
            } catch (error) {
                console.error('Error during modification:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Sei sicuro di voler eliminare questo elemento?');

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/viaggi/deleteById/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setData(prevData => prevData.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    };

    const handleCreate = async () => {
        if (newTitle && newDescription) {
            try {
                const response = await fetch(`http://localhost:8080/api/viaggi/save`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        titolo: newTitle, 
                        image: newImageUrl,
                        stato: newState, 
                        provincia: newProvincia, 
                        citta: newCity, 
                        descrizione: newDescription,
                        prezzo: newPrice, 
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const newItem = await response.json();
                setData(prevData => [...prevData, newItem]);
                resetFields();
                setWindowOpen(false); // Chiude la finestra di creazione
            } catch (error) {
                console.error('Error during creation:', error);
            }
        }
    };

    const handleCreateOpen = () => {
        resetFields(); // Resetta i campi per la creazione
        setWindowOpen(true); // Apre la sezione di creazione
    }

    const resetFields = () => {
        setNewTitle('');
        setNewImageUrl('');
        setNewState('');
        setNewCity('');
        setNewProvincia('');
        setNewDescription('');
        setNewPrice('');
        setCurrentId(null); // Resetta l'ID corrente
    };

    const handleCancel = () => {
        resetFields(); // Resetta i campi
        setWindowOpen(false); // Chiude la sezione di creazione
        setWindowOpenModify(false); // Chiude la sezione di modifica
    };

    return (
        <>
            <section className='backgroundCreate'>
                <h3>
                    Benvenuto nella pagina della creazione Admin!
                </h3>

                <button onClick={handleCreateOpen}>Crea</button>

                {windowOpen && (
                    <section className='create'>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Titolo" 
                                value={newTitle} 
                                onChange={(e) => setNewTitle(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="URL Immagine" 
                                value={newImageUrl} 
                                onChange={(e) => setNewImageUrl(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Stato" 
                                value={newState} 
                                onChange={(e) => setNewState(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Città" 
                                value={newCity} 
                                onChange={(e) => setNewCity(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Provincia" 
                                value={newProvincia} 
                                onChange={(e) => setNewProvincia(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Descrizione" 
                                value={newDescription} 
                                onChange={(e) => setNewDescription(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                type="number" 
                                placeholder="Prezzo" 
                                value={newPrice} 
                                onChange={(e) => setNewPrice(e.target.value)} 
                            />
                        </div>
                        <button onClick={handleCreate}>Salva</button>
                        <button onClick={handleCancel}>Annulla</button>
                    </section>
                )}

                {windowOpenModify && (
                    <section className='create'>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Titolo" 
                                value={newTitle} 
                                onChange={(e) => setNewTitle(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="URL Immagine" 
                                value={newImageUrl} 
                                onChange={(e) => setNewImageUrl(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Stato" 
                                value={newState} 
                                onChange={(e) => setNewState(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Città" 
                                value={newCity} 
                                onChange={(e) => setNewCity(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Provincia" 
                                value={newProvincia} 
                                onChange={(e) => setNewProvincia(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Descrizione" 
                                value={newDescription} 
                                onChange={(e) => setNewDescription(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                type="number" 
                                placeholder="Prezzo" 
                                value={newPrice} 
                                onChange={(e) => setNewPrice(e.target.value)} 
                            />
                        </div>
                        <button onClick={handleModify}>Salva Modifiche</button>
                        <button onClick={handleCancel}>Annulla</button>
                    </section>
                )}

                <div className="card-container">
                    {data.map((item) => (
                        <div key={item.id} className="card">
                            <h3>{item.titolo}</h3>
                            <img src={item.image} alt="immagine copertina" />
                            <p>{item.stato}</p>
                            <p>{item.regione}</p>
                            <p>{item.provincia}</p>
                            <p>{item.citta}</p>
                            <p>{item.descrizione}</p>
                            <p>{item.prezzo}</p>
                            <div className="button-group"> 
                                <button onClick={() => handleModifyOpen(item)}>Modifica</button>
                                <button onClick={() => handleDelete(item.id)}>Elimina</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default MainCreazione;