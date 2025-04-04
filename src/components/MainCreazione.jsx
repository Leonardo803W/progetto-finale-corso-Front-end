import React, { useEffect, useState } from 'react';
import GlobalLoading from './GlobalLoading'; // Importa il tuo componente di caricamento
import GlobalError from './GlobalError'; // Importa il tuo componente di errore

const MainCreazione = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [windowOpen, setWindowOpen] = useState(false);
    const [windowOpenModify, setWindowOpenModify] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Stato per i campi di input
    const [newTitle, setNewTitle] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newState, setNewState] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newProvincia, setNewProvincia] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newAdult, setNewAdult] = useState('');
    const [newChild, setNewChild] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [inputValue, setInputValue] = useState('');


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
                console.log(result)
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
        setNewAdult(item.adulti);
        setNewChild(item.bambini);
        setNewStartDate(item.checkIn);
        setNewEndDate(item.checkOut);
        setCurrentId(item.id);
        setWindowOpenModify(true);
    };

    const handleModify = async (id, data) => {
        try {
          const response = await fetch(`http://localhost:8080/api/viaggi/modifyById/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const result = await response.json();
          console.log('Success:', result);
        } catch (error) {
          console.error('Error during modification:', error);
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
                        prezzo: newPrice, // Assicurati che sia un numero
                        adulti: newAdult, // Assicurati che sia un numero
                        bambini: newChild, // Assicurati che sia un numero
                        checkIn: newStartDate, 
                        checkOut: newEndDate, 
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
        setNewAdult('');
        setNewChild('');
        setNewStartDate('');
        setNewEndDate('');
        setCurrentId(null); // Resetta l'ID corrente
    };

    const handleCancel = () => {
        resetFields(); // Resetta i campi
        setWindowOpen(false); // Chiude la sezione di creazione
        setWindowOpenModify(false); // Chiude la sezione di modifica
    };

    return (
        <>
            <section>

                <button className = 'buttonCreate' onClick={handleCreateOpen}> <span>Vuoi creare un nuovo viaggio? </span>Crea</button>

                {windowOpen && (
                    <section className='create'>
                        <div>
                            <label>Titolo: </label>
                            <input 
                                type="text" 
                                placeholder="Bar disco...." 
                                value={newTitle || ''} 
                                onChange={(e) => setNewTitle(e.target.value)} 
                            />

                            <label>Immagine: </label>
                            <input 
                                type="text" 
                                placeholder="URL Immagine" 
                                value={newImageUrl || ''} 
                                onChange={(e) => setNewImageUrl(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Stato: </label>
                            <input 
                                type="text" 
                                placeholder="Canada" 
                                value={newState || ''} 
                                onChange={(e) => setNewState(e.target.value)} 
                            />

                            <label>Citta: </label>
                            <input 
                                type="text" 
                                placeholder="Parigi" 
                                value={newCity || ''} 
                                onChange={(e) => setNewCity(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Provincia: </label>
                            <input 
                                type="text" 
                                placeholder="Sondrio" 
                                value={newProvincia || ''} 
                                onChange={(e) => setNewProvincia(e.target.value)} 
                            />

                            <label>Descrizione: </label>
                            <input 
                                type="text" 
                                placeholder="Ostello accogliente e servizi ottimi...." 
                                value={newDescription || ''} 
                                onChange={(e) => setNewDescription(e.target.value)} 
                            />
                        </div>

                        <div>
                            <label>Quanti adulti?: </label>
                            <input 
                                type="number" 
                                placeholder="1" 
                                value={newAdult || ''} 
                                onChange={(e) => setNewAdult(e.target.value)}
                            />

                            <label>Quanti bambini?: </label>
                            <input 
                                type="number" 
                                placeholder="1" 
                                value={newChild || ''} 
                                onChange={(e) => setNewChild(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Data di check-In: </label>
                            <input 
                                type="date" 
                                placeholder="Data Inizio" 
                                value={newStartDate || ''} 
                                onChange={(e) => setNewStartDate(e.target.value)} 
                            />

                            <label>Data d check-Out: </label>
                            <input 
                                type="date" 
                                placeholder="Data Fine" 
                                value={newEndDate || ''} 
                                onChange={(e) => setNewEndDate(e.target.value)} 
                            />
                        </div>

                        <div>
                            <label>Prezzo: </label>
                            <input 
                                type="number" 
                                placeholder="500" 
                                value={newPrice || ''} 
                                onChange={(e) => setNewPrice(e.target.value)} 
                            />
                        </div>

                        <button className = "button1" onClick={handleCreate}>Salva</button>
                        <button className = "button2"  onClick={handleCancel}>Annulla</button>

                    </section>
                )}

                {windowOpenModify && (
                    <section className='create'>
                        <div>
                            <label>Titolo: </label>
                            <input 
                                type="text" 
                                placeholder="Bar disco...." 
                                value={newTitle || ''} 
                                onChange={(e) => setNewTitle(e.target.value)} 
                            />

                            <label>Immagine: </label>
                            <input 
                                type="text" 
                                placeholder="URL Immagine" 
                                value={newImageUrl || ''} 
                                onChange={(e) => setNewImageUrl(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Stato: </label>
                            <input 
                                type="text" 
                                placeholder="Canada" 
                                value={newState || ''} 
                                onChange={(e) => setNewState(e.target.value)} 
                            />

                            <label>Citta: </label>
                            <input 
                                type="text" 
                                placeholder="Parigi" 
                                value={newCity || ''} 
                                onChange={(e) => setNewCity(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Provincia: </label>
                            <input 
                                type="text" 
                                placeholder="Sondrio" 
                                value={newProvincia || ''} 
                                onChange={(e) => setNewProvincia(e.target.value)} 
                            />

                            <label>Descrizione: </label>
                            <input 
                                type="text" 
                                placeholder="Ostello accogliente e servizi ottimi...." 
                                value={newDescription || ''} 
                                onChange={(e) => setNewDescription(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>Quanti adulti?: </label>
                            <input 
                                type="number" 
                                placeholder="1" 
                                value={newAdult || ''} 
                                onChange={(e) => setNewAdult(e.target.value)}
                            />

                            <label>Quanti bambini?: </label>
                            <input 
                                type="number" 
                                placeholder="1" 
                                value={newChild || ''} 
                                onChange={(e) => setNewChild(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Data di check-In: </label>
                            <input 
                                type="date" 
                                placeholder="Data Inizio" 
                                value={newStartDate || ''} 
                                onChange={(e) => setNewStartDate(e.target.value)} 
                            />

                            <label>Data d check-Out: </label>
                            <input 
                                type="date" 
                                placeholder="Data Fine" 
                                value={newEndDate || ''} 
                                onChange={(e) => setNewEndDate(e.target.value)} 
                            />
                        </div>

                        <div>
                            <label>Prezzo: </label>
                            <input 
                                type="number" 
                                placeholder="500" 
                                value={newPrice || ''} 
                                onChange={(e) => setNewPrice(e.target.value)} 
                            />
                        </div>

                        <button onClick={handleModify}>Salva Modifiche</button>
                        <button onClick={handleCancel}>Annulla</button>
                    </section>
                )}

                <div className="card-container">
                    {data.map((item) => (
                        <div key={item.id} className="cardList">
                            <h3>{item.titolo}</h3>
                            {item.image ? (
                                <img src={item.image} alt="immagine copertina" />
                            ) : (
                                <p>Nessuna immagine disponibile</p> // Messaggio di fallback
                            )}

                            <p>Luogo della struttura: {item.stato}</p>

                            <div className='divGroup'>
                                <p>Check In: {item.checkIn}</p>
                                <p>Check Out: {item.checkOut}</p>               
                            </div>

                            <div className='divGroup'>
                                <p>camere per adulti: {item.adulti}</p>
                                <p>camere per bambini: {item.bambini}</p>                           
                            </div>

                            <p className='m-0 p-3'>Prezzo della prenotazione: {item.prezzo}</p>

                            <div id="buttonList"> 
                                <button id="buttonDCreate1" onClick={() => handleModifyOpen(item)}>Modifica</button>
                                <button id="buttonDCreate2" onClick={() => handleDelete(item.id)}>Elimina</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default MainCreazione;