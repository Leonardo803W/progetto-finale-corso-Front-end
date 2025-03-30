import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

class ListNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      isStartDatePickerOpen: false,
      isEndDatePickerOpen: false,
      isGuestPickerOpen: false,
      isProfileDown: false,
      autenticate: false,
      isUserLoggedIn: false,
      isAlertOpenBye: false,
    };

    console.log(props)
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date, isStartDatePickerOpen: false });
    this.props.setChekIn(date); // Passa la data di check-in al genitore
  };

  handleEndDateChange = (date) => {
    this.setState({ endDate: date, isEndDatePickerOpen: false });
    this.props.setCheckOut(date); // Passa la data di check-out al genitore
  };

  //funzione per la chiusura della tend del chek-in

  toggleStartDatePicker = () => {

    this.setState((prevState) => ({
      isStartDatePickerOpen: !prevState.isStartDatePickerOpen
    }));
  };

  //funzione per la chiusura della tend del chek-out

  toggleEndDatePicker = () => {

    this.setState((prevState) => ({
      isEndDatePickerOpen: !prevState.isEndDatePickerOpen
    }));
  };

  //funzione per aprire la tenda per selezionare la quantita degli ospitit

  toggleGuestPicker = () => {

    this.setState((prevState) => ({
      isGuestPickerOpen: !prevState.isGuestPickerOpen
    }));
  };

  //funzione per aprire la tenda del profilo

  toggleProfileDropdown = () => {

    this.setState((prevState) => ({
      isProfileDown: !prevState.isProfileDown,
    }));
  };

  //funzione per il log out che rimuove il token dato 

  handleLogout = () => {

    localStorage.removeItem("isAdmin")
    localStorage.removeItem("token"); // Clear token
    this.setState({ autenticate: false, isUserLoggedIn: false }); // Reset admin state

    this.setState({ isAlertOpenBye: true });

      // Chiudi l'alert dopo 3 secondi
      setTimeout(() => {
          this.setState({ isAlertOpenBye: false });
      }, 3000);
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);

    // Controlla se l'utente è loggato
    const token = localStorage.getItem('token');

    this.setState({ isUserLoggedIn: !!token, autenticate: true });
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);

    // Controlla se l'utente è loggato
    const isAdmin = localStorage.getItem('isAdmin');

    this.setState({ autenticateAdmin: isAdmin, autenticate: true });
  }

  //funzione che ascolta i click nel momento che il componente viene smontato

  componentWillUnmount() { 

    document.removeEventListener('click', this.handleClickOutside);
  }

  //funzioni per incrementare e diminuire il numero di ospiti

  incrementAdults = () => {
    this.props.setAdulti(this.props.adulti + 1); // Aggiorna il numero di adulti
  };

  decrementAdults = () => {
    this.props.setAdulti(Math.max(this.props.adulti - 1, 0)); // Aggiorna il numero di adulti
  };

  incrementChildren = () => {
    this.props.setBambini(this.props.bambini + 1); // Aggiorna il numero di bambini
  };

  decrementChildren = () => {
    this.props.setBambini(Math.max(this.props.bambini - 1, 0)); // Aggiorna il numero di bambini
  };

  handleSearch = () => {
    this.props.onSearch(); // Call the search method passed from SchermataList
  };

  resetFilters = () => {
      this.props.onReset(); // Call the reset method passed from SchermataList
  };

  render() {

    //renderizzazione delle variabili
    const { title, dove, setDove } = this.props;
    const { autenticate, isUserLoggedIn, isAlertOpenBye } = this.state;
    
    return (
      <section className="listNavbar">
        <Link to={"/"}>
          <div className="brand">Viaggi Passione</div>
        </Link>

        <div className="settings">
          <button>
              <label className='d-block pb-2 pe-2'>dove</label>
              <input 
                type="text" 
                className='p-2 border-0' 
                placeholder="stato, paese o nazione"
                value={dove}
                            onChange={(e) => setDove(e.target.value)} // Update state on input change
              />
            </button>

          <div ref={this.startDatePickerRef}>
            <label className='d-block pb-2 pe-2'>check-in</label>
            <button onClick={this.toggleStartDatePicker}>
            {this.state.startDate? this.state.startDate.toLocaleDateString() : 'Seleziona data'}
            </button>
            {this.state.isStartDatePickerOpen && (
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDateChange}
                minDate={new Date()}
                inline 
                
              />
            )}
          </div>

          <div ref={this.endDatePickerRef}>
            <label className='d-block pb-2 pe-2'>check-out</label>
            <button onClick={this.toggleEndDatePicker} disabled={!this.state.startDate}>
            {this.state.endDate ? this.state.endDate.toLocaleDateString() : 'Seleziona data'}
            </button>
            {this.state.isEndDatePickerOpen && (
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndDateChange}
                minDate={this.state.startDate ? new Date(this.state.startDate) : new Date()}
                inline
              />
            )}
          </div>

          {/* Selettore per Ospiti */}
          <div>
            <button onClick={this.decrementAdults}>-</button>
            <span>{this.props.adulti}</span>
            <button onClick={this.incrementAdults}>+</button>
            <button onClick={this.decrementChildren}>-</button>
            <span>{this.props.bambini}</span>
            <button onClick={this.incrementChildren}>+</button>
          </div>

          <button onClick={this.handleSearch}>Cerca</button>
          <button onClick={this.resetFilters}>Reset</button>
        </div>

        <button className="profile" onClick={this.toggleProfileDropdown} ref={this.profileDropdownRef}>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list me-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>

            {this.state.isProfileDown && (
              <div className="profileDropdown">
                <ul>
                  {!autenticate ? (
                    <>
                    <Link to = "/" >
                    <li>non sei ancora registrato? <span>registrati!</span></li>
                    </Link>
                    </>
                    ) : (
                      <>
                        {isUserLoggedIn ? (
                          <>
                            <li><Link to="/prenotazioni">prenotazioni</Link></li>
                            <li><Link to="/preferiti">Preferiti</Link></li>
                            <li onClick={this.handleLogout}>Logout</li>
                          </>
                        ) : (
                          <>
                            <li><Link to="/create">Creazione</Link></li>
                            <li onClick={this.handleLogout}>Logout</li>
                          </>
                        )}
                      </>
                    )
                  }
                </ul>
              </div>
            )}
        </button>

        {isAlertOpenBye && ( 
        <div className="alertLoginRegister">
          <h4>Hey, see you agein</h4>
            <p>
               "Logout effetuato con sucesso!!"
            </p>
        </div>
        )}

      </section>
      
    );
  }
}

export default ListNavbar;
