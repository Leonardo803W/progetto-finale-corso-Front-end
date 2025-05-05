import axios from "axios";
import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

class GlobalNavbar extends Component {

  //inizializzazione variabili 

  constructor(props) {  

    super(props);
    this.state = {

      isAlertOpenBye: false,
      isAlertOpen: false,
      isAlertOpenError: false,
      isProfileDropdownOpen: false,
      isModalOpenAdminLogin: false,
      isModalOpenUserLogin: false,
      isRegisterModeUser: false,
      isRegisterModeAdmin: false,
      username: '',
      password: '',
      email: '',
      adminCode: '',
      isAuthenticated: false,
      isAdmin: false,

      nameLog: '',
      avatarUrl: '',
    };

    //utilizzo il ref per poter prendere i valori direttamente dal MOD

    this.profileDropdownRef = React.createRef();
  }

  //funzione per aprire la tenda del profileDropdown

  toggleProfileDropdown = () => {

    this.setState((prevState) => ({ isProfileDropdownOpen: !prevState.isProfileDropdownOpen }));
  };

  //funzione per chiudere la tenda del profileDropdown nel momento che si clicca al di fuori di profileDropdown

  handleClickOutside = (event) => {

    if (this.profileDropdownRef.current && !this.profileDropdownRef.current.contains(event.target) ) 
    {
      this.setState({

        isProfileDropdownOpen: false,
      });
    }
  };

  //funzione che ascolta i click nel momento che il componente viene montato

  componentDidMount() {

    document.addEventListener('click', this.handleClickOutside);

    // Controlla se l'utente è loggato
    const tokenUser = localStorage.getItem('isUserToken');
    const tokenAdmin = localStorage.getItem('isAdminToken');
    this.setState({ isAuthenticated: !!tokenUser || !!tokenAdmin });  
  }

  //funzione che ascolta i click nel momento che il componente viene smontato

  componentWillUnmount() { 

    document.removeEventListener('click', this.handleClickOutside);
  }

  //funzione per aprire la tenda modal per la registrazione o il login

  openModalAdmin = (isRegisterModeAdmin = false, isAdminMode = false) => {

    this.setState({ isModalOpenAdminLogin: true, isRegisterModeAdmin, isAdmin: isAdminMode });
  };

  openModalUser = (isRegisterModeUser = false) => {

    this.setState({ isModalOpenUserLogin: true, isRegisterModeUser });
  };

  //funzione per chiudere la tenda modal azzerando di default le variabili e il loro valore

  closeModalUser = () => {

    this.setState({ isModalOpenUserLogin: false, username: '', password: '', email: '' });
  };

  closeModalAdmin = () => {

    this.setState({ isModalOpenAdminLogin: false, username: '', password: '', email: '', adminCode: '' });
  };

  //funzione per il log out che rimuove il token dato 

  handleLogout = () => {

    localStorage.removeItem("isUserToken"); // Clear user token
    localStorage.removeItem("isAdminToken"); // Clear admin token

    this.setState({ isAuthenticated: false, isAdmin: false }); // Reset admin state and authentication

    this.setState({ isAlertOpenBye: true });

    setTimeout(() => {
      
      // Durata visualizzazione dell'alert
      this.setState({ isAlertOpenBye: false });
      window.location.href = '/'; // Reindirizza alla homepage utilizzando window.location

    }, 3000);
  };

  //funzione per cambiare gli input di registrazione e di login

  handleInputChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  };

  //fetch per con query per il login o il register dell'utente e il login per l'admin

  handleAuthSubmitUser = (event) => {

    //prevenzione di lancio fetch non eseguito dall'utente
    event.preventDefault();

    const { isRegisterModeUser, username, password, email } = this.state;

    let endPointUser = isRegisterModeUser ? 'http://localhost:8080/api/auth/user/register' : 'http://localhost:8080/api/auth/account/login';
    let dataUser = isRegisterModeUser ? { username, password, email } : { username, password };


    axios.post(endPointUser, dataUser).then(response => {

      console.log(response); 

      // controllo risposta token
      if (response.data && response.data.token) {

        localStorage.setItem("isUserToken", response.data.token);
        this.setState({ isAuthenticated: true, isAlertOpen: true });
        this.closeModalUser();

        setTimeout(() => {
          this.setState({ isAlertOpen: false });
        }, 3000);
      } 

      const identifier = username;
      const type = 'username';

      axios.get('http://localhost:8080/api/auth/account/details', {

        // parametri richiesti dall'endPoint
        params: {
          identifier: identifier,
          type: type
        }
      })
      .then(res => {
        
        console.log(res);
        const userData = res.data;
        console.log('Dati utente:', userData);

        // siccome che setState in React è una funzione asincrona che aggiorna lo stato del componente e, 
        // opzionalmente, accetta una funzione di callback come secondo parametro. 
        // Questa funzione di callback viene eseguita dopo che lo stato è stato aggiornato con successo.
        this.setState({ nameLog: userData.username, avatarUrl: userData.avatar },
          () => {

            // salvo il nome e l'avatar nel locl storage per poterli utilizzare nella globalNavbar,
            // al posto dell'immagine di profilo dopop che l'utente si sia registrato o fatto il log in.
            localStorage.setItem('name', this.state.nameLog)
            localStorage.setItem('avatarUrl', this.state.avatarUrl)
            console.log(localStorage);
          }
        );

      })
      .catch(err => {
        
        console.error('Errore nel recupero dei dettagli utente:', err);
      });

    })
    .catch(error => {
      console.error("Authentication error", error);
      this.setState({ isAlertOpenError: true });
      setTimeout(() => {
        this.setState({ isAlertOpenError: false });
      }, 6000);
    });
  };

  handleAuthSubmitAdmin = (event) => {

    event.preventDefault();
  
    const { isRegisterModeAdmin, username, password, email, adminCode, isAdmin } = this.state;
  
    const endPointAdmin = isRegisterModeAdmin ? 'http://localhost:8080/api/auth/admin/register' : 'http://localhost:8080/api/auth/account/login';
    const dataAdmin = isRegisterModeAdmin ? { username, password, email } : { username, password };
  
    // Ulteriore controllo adminCode per il ruolo admin lato front-and
    if (adminCode !== 'leo') {
      alert('Invalid admin code');
      return;
    }
  
    axios.post(endPointAdmin, dataAdmin).then(response => {

      console.log(response); 

      // controllo risposta token
      if (response.data && response.data.token) {

        localStorage.setItem("isAdminToken", response.data.token);
        this.setState({ isAuthenticated: true, isAdmin: true, isAlertOpen: true });
        this.closeModalAdmin();
        console.log(localStorage);

        setTimeout(() => {
          this.setState({ isAlertOpen: false });
        }, 3000);

      }

      const identifier = username;
      const type = 'username';

      axios.get('http://localhost:8080/api/auth/account/details', {

        // parametri richiesti dall'endPoint
        params: {
          identifier: identifier,
          type: type
        }
      })
      .then(res => {
        
        console.log(res);
        const userData = res.data;
        console.log('Dati utente:', userData);

        // siccome che setState in React è una funzione asincrona che aggiorna lo stato del componente e, 
        // opzionalmente, accetta una funzione di callback come secondo parametro. 
        // Questa funzione di callback viene eseguita dopo che lo stato è stato aggiornato con successo.
        this.setState({ nameLog: userData.username, avatarUrl: userData.avatar },
          () => {

            // salvo il nome e l'avatar nel locl storage per poterli utilizzare nella globalNavbar,
            // al posto dell'immagine di profilo dopop che l'utente si sia registrato o fatto il log in.
            localStorage.setItem('name', this.state.nameLog)
            localStorage.setItem('avatarUrl', this.state.avatarUrl)
            console.log(localStorage);
          }
        );

      })
      .catch(err => {
        
        console.error('Errore nel recupero dei dettagli utente:', err);
      });

    })
    .catch(error => {
      console.error("Authentication error", error);
      this.setState({ isAlertOpenError: true });
      setTimeout(() => {
        this.setState({ isAlertOpenError: false });
      }, 6000);
    });
  };

  render() {

    //renderizzazione valori delle variabili

    const { isProfileDropdownOpen, isModalOpenUserLogin, isModalOpenAdminLogin, isRegisterModeUser, isRegisterModeAdmin, isAuthenticated, isAdmin, isAlertOpen, isAlertOpenBye, isAlertOpenError } = this.state;

    return (
      <>
        {/* Logo Icon */}
        <section className = "globalNavbarHeader">
          <Link to={"/"}>
            <div className="brand">Viaggi di Passione</div>
          </Link>

          {/* search button */}
          <Link to={"/list"}>
            <button className = "buttonSerach">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>

              Vuoi passare direttamente alla ricerca?
            </button>
          </Link>

          <button className = "profile" onClick={this.toggleProfileDropdown} ref={this.profileDropdownRef}>
           
            {/* Profile Icon */}
            <div className = "d-flex align-items-center">
              {!isAuthenticated ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list me-2" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>


                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>  
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    
                    <p className = "pe-3 ps-3 m-0">nome</p>

                    <img src = "https://placedog.net/50" alt = "immagine profilo" />
                  </>
                )}
            </div>

            {/* Profile info */}
            {isProfileDropdownOpen && !isModalOpenUserLogin && !isModalOpenAdminLogin && (
            <div className="profileDropdown">
              <ul>
                {!isAuthenticated ? (
                  <>
                    <li onClick={() => this.openModalUser(false)}>User Login</li>
                    <li onClick={() => this.openModalAdmin(false)}>Admin Login</li>
                  </>
                ) : (
                  <>
                    {isAdmin ? (
                      <>
                        <Link to="/profiloAdmin"><li>Profilo</li></Link>
                        <Link to="/create"><li>Creazione</li></Link>
                        <li onClick={this.handleLogout}>Logout</li>
                      </>
                    ) : (
                      <>
                        <Link to="/profiloUser"><li>Profilo</li></Link>
                        <Link to="/preferiti"><li>Preferiti</li></Link>
                        <Link to="/prenotazioni"><li>prenotazioni</li></Link>
                        <li onClick={this.handleLogout}>Logout</li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          )}      
          </button>
        </section>

        {isAlertOpenError && ( 
        <div id = "alertError">
          <h4>Sorry mate.</h4>
            <p>
               "Controllare i ati inseriti se sono corretti oppure non ti sei ancora registrato per accedere!"
            </p>
        </div>
        )}

        {isAlertOpen && ( 
        <div className = "alertLoginRegister">
          <h4>Hey, nice to see you</h4>
            <p>
               "accesso effetuato con sucesso!!"
            </p>
        </div>
        )}

        {isAlertOpenBye && ( 
        <div className = "alertLoginRegister">
          <h4>Hey, see you agein</h4>
            <p>
               "Logout effetuato con sucesso!!"
            </p>
        </div>
        )}

        {/* Register or login */}
        {isModalOpenUserLogin && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className = "mb-4">{isRegisterModeUser ? "Registrati" : "Accedi" }</h2>

              <form onSubmit={this.handleAuthSubmitUser} className = "mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                {isRegisterModeUser && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />

                <button className = "button1" type="submit">{isRegisterModeUser ? "Registrati" : "Accedi"}</button>
                <button className = "button2" type="button" onClick={this.closeModalUser}>Chiudi</button>
              </form>

              <button onClick={() => this.openModalUser(!isRegisterModeUser)}>
                {isRegisterModeUser ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
              </button>
            </div>
          </div>
        )}

        {/* Register or login */}
        {isModalOpenAdminLogin && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className = "mb-4">{isRegisterModeAdmin ? "Registrati" : "Accedi" }</h2>

              <form onSubmit={this.handleAuthSubmitAdmin} className = "mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                {isRegisterModeAdmin && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                  <input
                    type="text"
                    name="adminCode"
                    placeholder="Admin Code"
                    value={this.state.adminCode}
                    onChange={this.handleInputChange}
                    required
                  />

                <button className = "button1" type="submit">{isRegisterModeAdmin ? "Registrati" : "Accedi"}</button>
                <button className = "button2" type="button" onClick={this.closeModalAdmin}>Chiudi</button>
              </form>

              <button onClick={() => this.openModalAdmin(!isRegisterModeAdmin)}>
                {isRegisterModeAdmin ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default GlobalNavbar;          