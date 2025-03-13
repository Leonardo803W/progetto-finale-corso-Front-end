import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

class ListNavbar extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      country: '',
      startDate: null,
      endDate: null,
      isStartDatePickerOpen: false,
      isEndDatePickerOpen: false,
      isGuestPickerOpen: false,
      isProfileDropdownOpen: false,
      adults: 0,
      children: 0,
    };
    
    this.startDatePickerRef = React.createRef();
    this.endDatePickerRef = React.createRef();
    this.guestPickerRef = React.createRef();
    this.profileDropdownRef = React.createRef();
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date, isStartDatePickerOpen: false });
  };

  handleEndDateChange = (date) => {
    this.setState({ endDate: date, isEndDatePickerOpen: false });
  };

  toggleStartDatePicker = () => {
    this.setState((prevState) => ({
      isStartDatePickerOpen: !prevState.isStartDatePickerOpen
    }));
  };

  toggleEndDatePicker = () => {
    this.setState((prevState) => ({
      isEndDatePickerOpen: !prevState.isEndDatePickerOpen
    }));
  };

  toggleGuestPicker = () => {
    this.setState((prevState) => ({
      isGuestPickerOpen: !prevState.isGuestPickerOpen
    }));
  };

  toggleProfileDropdown = () => {
    this.setState((prevState) => ({
      isProfileDropdownOpen: !prevState.isProfileDropdownOpen,
    }));
  };

  handleClickOutside = (event) => {
    if (
      this.startDatePickerRef.current &&
      !this.startDatePickerRef.current.contains(event.target) &&
      this.endDatePickerRef.current &&
      !this.endDatePickerRef.current.contains(event.target) &&
      this.guestPickerRef.current &&
      !this.guestPickerRef.current.contains(event.target) &&
      this.profileDropdownRef.current &&
      !this.profileDropdownRef.current.contains(event.target) 
    ) {
      this.setState({
        isStartDatePickerOpen: false,
        isEndDatePickerOpen: false,
        isGuestPickerOpen: false,
        isProfileDropdownOpen: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() { 
    document.removeEventListener('click', this.handleClickOutside);
  }

  incrementAdults = () => {
    this.setState((prevState) => ({ adults: prevState.adults + 1 }));
  };

  decrementAdults = () => {
    this.setState((prevState) => ({ adults: Math.max(prevState.adults - 1, 0) }));
  };

  incrementChildren = () => {
    this.setState((prevState) => ({ children: prevState.children + 1 }));
  };

  decrementChildren = () => {
    this.setState((prevState) => ({ children: Math.max(prevState.children - 1, 0) }));
  };

  render() {

    const { startDate, endDate, isStartDatePickerOpen, isEndDatePickerOpen, isGuestPickerOpen, isProfileDropdownOpen, adults, children } = this.state;

    return (
      <section className="d-inline-flex justify-content-between w-100 pe-4 ps-4 align-items-center">
        <Link to={"/"}>
          <div className="brand">Viaggi Passione</div>
        </Link>

        <div className="settings">
          <button>
            <label className='d-block pb-2 pe-2'>dove</label>
            <input 
              type="text" 
              className = 'p-2 border-0' 
              placeholder = "stato, paese o nazione"
            />
          </button>

          <div ref={this.startDatePickerRef}>
            <label className='d-block pb-2 pe-2'>check-in</label>
            <button type="button" onClick={this.toggleStartDatePicker} className='p-2 border-0'>
              {startDate ? startDate.toLocaleDateString() : 'Seleziona data'}
            </button>
            {isStartDatePickerOpen && (
              <div className="data">
                <DatePicker
                  selected={startDate}
                  onChange={this.handleStartDateChange}
                  minDate={new Date()}
                  inline
                />
              </div>
            )}
          </div>

          <div ref={this.endDatePickerRef}>
            <label className='d-block pb-2 pe-2'>check-out</label>
            <button type="button" onClick={this.toggleEndDatePicker} className='p-2 border-0' disabled={!startDate}>
              {endDate ? endDate.toLocaleDateString() : 'Seleziona data'}
            </button>
            {isEndDatePickerOpen && (
              <div className="data">
                <DatePicker
                  selected={endDate}
                  onChange={this.handleEndDateChange}
                  minDate={startDate ? new Date(startDate) : new Date()}
                  inline
                />
              </div>
            )}
          </div>

          <div ref={this.guestPickerRef}>
            <label className='d-block pb-2 pe-2'>chi</label>
            <button type="button" onClick={this.toggleGuestPicker} className='p-2 border-0'>
              {adults + children > 0 ? `${adults} adulti, ${children} bambini` : 'Seleziona ospiti'}
            </button>
            {isGuestPickerOpen && (
              <div className="guestPicker">
                <div>
                  <label className="p-1">Adulti</label>
                  <button onClick={this.decrementAdults}>-</button>
                  <span>{adults}</span>
                  <button onClick={this.incrementAdults}>+</button>
                </div>
                <hr />
                <div>
                  <label>Bambini</label>
                  <button onClick={this.decrementChildren}>-</button>
                  <span>{children}</span>
                  <button onClick={this.incrementChildren}>+</button>
                </div>
              </div>
            )}
          </div>

          <button>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="search"
                viewBox="0 0 16 16" 
                >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
        </button>

        </div>

        <button className="profile" onClick={this.toggleProfileDropdown} ref={this.profileDropdownRef}>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" className="me-2">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>

            {isProfileDropdownOpen && (
              <div className = "profileDropdown">
                <ul>
                  <li>Il mio profilo</li>
                  <li>Impostazioni</li>
                  <Link to = {"/favoriti"}
                    className = "link"
                  > 
                    <li>Preferiti</li>
                  </Link>
                  <li>Logout</li>
                </ul>
              </div>
            )}
        </button>

      </section>
    );
  }
}

export default ListNavbar;