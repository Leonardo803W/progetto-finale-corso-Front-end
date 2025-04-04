import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios";

class GlobalNavbar extends Component {

  //inizializzazione variabili 

  constructor(props) {
    super(props);

    this.state = {

      isAlertOpenBye: false,
      isAlertOpen: false,
      isProfileDropdownOpen: false,
      isModalOpen: false,
      isRegisterMode: false,
      username: '',
      password: '',
      email: '',
      adminCode: '',
      isAuthenticated: false,
      isAdmin: false,
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
    const token = localStorage.getItem('token');
    this.setState({ isAuthenticated: !!token });
  }

  //funzione che ascolta i click nel momento che il componente viene smontato

  componentWillUnmount() { 

    document.removeEventListener('click', this.handleClickOutside);
  }

  //funzione per aprire la tenda modal per la registrazione o il login

  openModal = (isRegisterMode = false, isAdminMode = false) => {

    this.setState({ isModalOpen: true, isRegisterMode, isAdmin: isAdminMode });
  };

  //funzione per chiudere la tenda modal azzerando di default le variabili e il loro valore

  closeModal = () => {

    this.setState({ isModalOpen: false, username: '', password: '', email: '', adminCode: '' });
  };

  //funzione per il log out che rimuove il token dato 

  handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("isAdmin"); // Clear admin token
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

  handleAuthSubmit = (event) => {

    //prevenzione di lancio fetch non eseguito dall'utente
    event.preventDefault();

    const { isRegisterMode, username, password, email, adminCode, isAdmin } = this.state;

    let endpoint = isRegisterMode ? 'http://localhost:8080/api/auth/register' : 'http://localhost:8080/api/auth/login';
    let data = isRegisterMode ? { username, password, email } : { username, password };

    if (isAdmin) {

        if (adminCode !== 'leo') {

          //lancio alert
          alert('Invalid admin code');
          return;
        }

        data.adminCode = adminCode; // Include admin code nel data
        endpoint = 'http://localhost:8080/api/auth/admin-login'; // Assuming you have a separate endpoint for admin login
    }

    axios.post(endpoint, data).then(response => {

      localStorage.setItem("token", response.data.token); // Store token user
      localStorage.setItem("isAdmin", response.data.adminCode); // Store token admin 

      console.log(response.data.token)
      console.log(response.data.adminCode)

      this.setState({ isAuthenticated: true, isAdmin: isAdmin, isAlertOpen: true }); // Set admin state and alert
      this.closeModal();
      this.setState({ isAlertOpen: true });

        //Durate  dell'alert 3 secondi
        setTimeout(() => {

            this.setState({ isAlertOpen: false });
        }, 3000);
      })
      .catch(error => {

           console.error("Authentication error", error);
      });
};

  render() {

    //renderizzazione valori delle variabili

    const { isProfileDropdownOpen, isModalOpen, isRegisterMode, isAuthenticated, isAdmin, isAlertOpen, isAlertOpenBye } = this.state;

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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list me-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>

            {/* Profile info */}
            {isProfileDropdownOpen && !isModalOpen && (
              <div className = "profileDropdown">
                <ul>
                  {!isAuthenticated ? (
                    <>
                      <li onClick={() => this.openModal(false)}>Login</li>
                      <li onClick={() => this.openModal(false, true)}>Admin Login</li>
                    </>
                  ) : (
                    <>
                      {isAdmin ? (
                        <>
                          <li><Link to="/create">Creazione</Link></li>
                          <li onClick={this.handleLogout}>Logout</li>
                        </>
                      ) : (
                        <>
                          <li><Link to="/preferiti">Preferiti</Link></li>
                          <li><Link to="/prenotazioni">prenotazioni</Link></li>
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

        {isAlertOpen && ( 
        <div className="alertLoginRegister">
          <h4>Hey, nice to see you</h4>
            <p>
               "accesso effetuato con sucesso!!"
            </p>
        </div>
        )}

        {isAlertOpenBye && ( 
        <div className="alertLoginRegister">
          <h4>Hey, see you agein</h4>
            <p>
               "Logout effetuato con sucesso!!"
            </p>
        </div>
        )}

        {/* Register or login */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className = "mb-4">{isRegisterMode ? "Registrati" : "Accedi" }</h2>

              <form onSubmit={this.handleAuthSubmit} className = "mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                {isRegisterMode && (
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
                {isAdmin && (
                  <input
                    type="text"
                    name="adminCode"
                    placeholder="Admin Code"
                    value={this.state.adminCode}
                    onChange={this.handleInputChange}
                    required
                  />
                )}
                <button className = "button1" type="submit">{isRegisterMode ? "Registrati" : "Accedi"}</button>
                <button className = "button2" type="button" onClick={this.closeModal}>Chiudi</button>
              </form>

              <button onClick={() => this.openModal(!isRegisterMode)}>
                {isRegisterMode ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default GlobalNavbar;