import React, { useEffect, useState } from 'react';
import GlobalLoading from './GlobalLoading'; // Importa il tuo componente di caricamento
import GlobalError from './GlobalError'; // Importa il tuo componente di errore

const MainCreazione = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [windowOpen, setWindowOpen] = useState(false);
    const [windowOpenModify, setWindowOpenModify] = useState(false);

    // Stato per i campi di input per le varie fetch
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

    // fetch per visualizzare tutti gli elementi gia esistenti
    useEffect(() => {
        
        const fetchData = async () => {
            
            setLoading(true);
            setError(false);

            const token = localStorage.getItem('isAdminToken'); // ottengo il token dal localStorage

            try {
                const response = await fetch('http://localhost:8080/api/viaggi/fetchall', {

                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
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

    // chiamo l'animazione per far intendere all'utente che vi e un caricamento in corso
    if (loading) { return <GlobalLoading />; }
    if (error) { return <GlobalError />; }

    // fetch per salvare un nuovo elemento
    const handleCreate = async () => {

        const token = localStorage.getItem('isAdminToken'); // ottengo il token dal localStorage

        try {
            
            const response = await fetch(`http://localhost:8080/api/viaggi/save`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
                    adulti: newAdult,
                    bambini: newChild,
                    checkIn: newStartDate, 
                    checkOut: newEndDate, 
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
    
            // Aggiungo il nuovo elemento alla lista
            setData(prevData => ({
                ...prevData,
                content: [result.data, ...prevData.content]
            }));
    
            resetFields(); // resetto i campi di input
            setWindowOpen(false); // chiudo il panello
    
        } catch (error) {
            console.error('Error during creation:', error);
        }
    };

    // fetch per modificare un elemento gia esistente
    const handleModify = async () => {

        const token = localStorage.getItem('isAdminToken'); // ottengo il token dal localStorage
        const id = localStorage.getItem('id'); // ottengo l'id dellelemento da modificare

        try {
            const response = await fetch(`http://localhost:8080/api/viaggi/modifyById/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
                    adulti: newAdult,
                    bambini: newChild,
                    checkIn: newStartDate,
                    checkOut: newEndDate,
                }),
            });

            //console.log(response)
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            const updatedItem = result.data;

            // funzione per riportare le modifiche dell'elemento evitando duplicazioni

            setData(prevData => ({
              ...prevData,
              content: prevData.content.map(item =>
                item.id === id ? updatedItem : item
              ),
            }));

        resetFields(); // Resetta i campi
        setWindowOpenModify(false); // Chiude la sezione di modifica

        } catch (error) {
            console.error('Error during modification:', error);
        }
    }

    // fetch per togliere un elemento gia esistente
    const handleDelete = async (id) => {

        const token = localStorage.getItem('isAdminToken'); // ottengo il token dal localStorage

        const confirmDelete = window.confirm('Sei sicuro di voler eliminare questo elemento?');
    
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/viaggi/deleteById/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                // funzione per rimuovere l'elemento dall'array
                setData(prevData => ({
                    ...prevData,
                    content: prevData.content.filter(item => item.id !== id)
                }));
                
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    };

    // funzione per aprire il pannello per creare un nuovo elemento
    const handleCreateOpen = () => {

        resetFields(); // Resetta i campi per la creazione
        setWindowOpen(true); // Apre la sezione di creazione
    }

    // funzione per chiudere qualunque tipo di panello che sia per cancellare, modificare o salvare un elemento
    const handleCancel = () => {

        resetFields(); // Resetta i campi
        setWindowOpen(false); // Chiude la sezione di creazione
        setWindowOpenModify(false); // Chiude la sezione di modifica
    };

    // funzione per risettare i campi dopo qualunque fetch
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
        localStorage.removeItem('id');
    };

    //funzione per modificare i vari input dei vari elementi
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
        localStorage.setItem('id', item.id) // salvo l'elemento da modificare
        setWindowOpenModify(true);
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
                {Array.isArray(data.content) && data.content.length > 0 ? (

                    data.content.map((item) => (

                        <div key={item.id} className="cardList">

                        {item.titolo !== '' && item.titolo !== null ? (

                            <h3>{item.titolo}</h3>
                        ) : (
                            <h3>Bar Beeach</h3>
                        )}

                        {item.image !== '' && item.image !== null ? (

                            <img className = 'w-100' src = {item.image} alt = "immagine copertina" />
                        ) : (
                            <img className = 'w-100' src = "https://res.cloudinary.com/dz4gkzrpj/image/upload/v1739531459/samples/landscapes/beach-boat.jpg" alt = "immagine copertina" />
                        )}

                        {item.stato !== '' && item.stato !== null ? (

                        <h3>{item.stato}</h3>
                        ) : (
                            <h3>Italia</h3>
                        )}

                        {item.checkIn !== '' && item.checkIn !== null ? (

                        <div className='divGroup'>
                            <p>Check In: {item.checkIn}</p>
                            <p>Check Out: {item.checkOut}</p>               
                        </div>
                        ) : null}
                        
                        {item.adulti !== '' && item.adulti !== null ? (

                        <div className='divGroup'>
                            <p>camere per adulti: {item.adulti}</p>
                            <p>camere per bambini: {item.bambini}</p>                           
                        </div>
                        ) : null}

                        {item.prezzo !== '' && item.prezzo !== null ? (

                        <p className='m-0 p-3'>Prezzo della prenotazione: {item.prezzo}</p>
                        ) : null}

                        <div id="buttonList"> 
                            <button id="buttonDCreate1" onClick={() => handleModifyOpen(item)}>Modifica</button>
                            <button id="buttonDCreate2" onClick={() => handleDelete(item.id)}>Elimina</button>
                        </div>
                    </div>
                    ))

                ) : (
                    <p>Nessun dato disponibile</p>
                )}
                </div>
            </section>
        </>
    );
};

export default MainCreazione;