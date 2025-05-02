import '../App.css';
import React, { Component } from 'react'; 

import GlobalLoading from './GlobalLoading'; 
import GlobalError from './GlobalError';

class ProfiloUser extends Component {

        constructor(props) {
            super(props)

            this.state = {
                data: [],
                loading: true,
                error: false,
                email: '',
                password: '',
                usarname: ''
            }
        }
        
render(){

    return(
        <>
            <img src="https://placedog.net/500" alt="" />
        </>
    )
}

}

export default ProfiloUser;