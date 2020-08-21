const React = require('react');
import { Button, InputGroup, FormControl, Container, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Restablecer from '../Restablecer/restablecer'

import { functionnode } from '../../../login/loginserver';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.updateusername = this.updateusername.bind(this);
        this.updatepassword = this.updatepassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    updateusername(event) {
        this.setState({ username: event.target.value })
    }
    updatepassword(event) {
        this.setState({ password: event.target.value })
    }




    
        handleSubmit(){
           const data = { 
                user: this.state.username,
                pass: this.state.password
            }  

            try {
                let config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }

                fetch('http://localhost:3302/getUser', config)
                    .then(res => res.json())
                    .then((data) => {
                        if(data[0].error == 'Error'){ alert('Usuario o Contraseña incorrectos') }
                        if(data[0].error == 'Ok'){ alert('BIENVENIDO')


                     }
                    });

            } catch (error){
                if(error){console.log('Error: ', error)}




        
      

    }

    }

    render() {

        return (


        
       <div>
         	<div className="modal-dialog login">
		<div className="modal-content">
			<div className="modal-header">
            <div class="avatar">
					<img src={'../component/imgs/login.jpg'} alt="Avatar"></img>
				</div>
					
				<h4 class="modal-title">BIENVENIDO</h4>	
               
			</div>
			<div className="modal-body">
				
					<div className="form-group">
			
                        <input type="email" className="form-control" id="username" placeholder="Usuario" required="required" onChange={this.updateusername}></input>	
					</div>
					<div class="form-group">
						
                       
                        <input type="password" className="form-control" placeholder="Password" id="password" onChange={this.updatepassword}></input>
					</div>        
					<div class="form-group">
						<button type="submit"   className="btn btn-primary btn-lg btn-block login-btn">Ingresar</button>
                     
					</div>
				
			</div>
			<div class="modal-footer">
				<a href="#">Recuperar Password</a>
			</div>
		</div>
	</div>
       </div>
		



           
        )
    }
}

export default App
