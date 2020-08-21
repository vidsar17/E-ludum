const React = require('react');
import { Button, InputGroup, FormControl,Container,Col } from 'react-bootstrap';

import {functionnode} from '../../../login/loginserver';

class App extends React.Component {  
    constructor(props) {
        super(props);
        
        this.state = {
            username : '',
            password:''
        
        }

        this.updateusername = this.updateusername.bind(this);
        this.updatepassword = this.updatepassword.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    }

        updateusername(event){
            this.setState({username : event.target.value})
        }
        updatepassword(event){
            this.setState({password : event.target.value})
        }
    
        handleSubmitDelete(){
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

                fetch('http://localhost:3302/deleteUser', config)
                    .then(res => res.json())
                    .then((data) => {  
                        if(data[0].error == 'Error'){ alert('Usuario o Contraseña incorrectos') }
                        if(data[0].error == 'Ok'){ alert('USUARIO ELIMINADO') }
                    });

            } catch (error){
                if(error){console.log('Error: ', error)}
            }

        }

    render() {
        
        return (
            <div>
                <Container>
                  

                <Col md={6}>

               {/* <img src={require(`${myImg}`)} /> */}
                                 
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <label>Correo</label>
                        <input type="email" id="username" onChange={this.updateusername}></input>
                    </InputGroup.Prepend>
               
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <label>Clave</label>
                        <div classname="fondo">
                            <Container>
                                <input type="password" id="password" onChange={this.updatepassword}></input>
                            </Container>
                        </div>

                    </InputGroup.Prepend>
               
                </InputGroup>
                
                <Button type="submit" onClick={this.handleSubmitDelete}  variant="dark">Eliminar usuario</Button>
                </Col>   
                </Container>
            </div>
        )
    }
}

export default App
