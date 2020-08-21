import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import { Button, InputGroup, FormControl,Container,Col } from 'react-bootstrap';
import request from 'superagent';
import { useState } from 'react';

class App extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            firstName : '',
            lastName: '',
            dateBirth: '',
            pass: '',
            mail: '',
            rol: '',
            code: '',
            openModal: false
        }

        //contenedores
        this.upDateFirstName = this.upDateFirstName.bind(this);
        this.upDateLastName =  this.upDateLastName.bind(this);
        this.upDateDateBirth = this.upDateDateBirth.bind(this);
        this.upDatePass = this.upDatePass.bind(this); 
        this.upDateMail = this.upDateMail.bind(this);
        this.upDateRol = this.upDateRol.bind(this);
        this.upDateCode = this.upDateCode.bind(this);
        this.handleSubmitReg = this.handleSubmitReg.bind(this);
        this.openModal = this.openModal.bind(this); 
    }

    //Implementacion del metodos:
    upDateFirstName(event){
        this.setState({firstName: event.target.value});
    }

    upDateLastName(event){
        this.setState({lastName: event.target.value});
    }

    upDateDateBirth(event){
        this.setState({dateBirth: event.target.value});
    }

    upDatePass(event){
        this.setState({pass: event.target.value});
    }

    upDateMail(event){
        this.setState({mail: event.target.value});
    }

    upDateRol(event){
        this.setState({rol: event.target.value});
    }

    upDateCode(event){
        this.setState({code: event.target.value})
    }

    //open modal and mail
    openModal(){
        this.setState({openModal: !this.state.openModal});

        let flagMail = { mail: this.state.mail};

        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(flagMail)
            }

            fetch('http://localhost:3302/sendMail', config)
                .then(res => res.json())
                .then((data) => {
                    if (data) { console.log('mail enviado'); }
            });

        } catch (error){
            if(error){console.log(`Error: ${error}`)}
        }
    }
    //Click del boton:
    handleSubmitReg(){
        //data for backend
        let newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateBirth: this.state.dateBirth,
            pass: this.state.pass,
            rol: this.state.rol,
            code: this.state.code
        }
       
        try{

            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newUser)
            }
            
            fetch('http://localhost:3302/setNewUser', config)
                .then(res => res.json())
                .then((data) => {
                this.message = data[0].error;
                
                if(data[0].error == 'Error'){ alert('El usuario ya existe!') };
                if(data[0].error == 'Ok'){ alert('BIENVENIDO A e-Ludum. Usuario registrado') };
                if(data[0].error == 'Cod error'){ alert('Codigo incorrecto') };
                console.log('el registro es: ', data[0].error); 
            });

            //Cierra el modal
            this.setState({openModal: !this.state.openModal});

        } catch (error){
            if(error){console.log(`Error: ${error}`)}
        }
    }

    /* Intento de cargar la lista desplegable:
   {           
        this.state.arrayRoles.map((dato, index) => {
        <option id={index.id_rol_usuarios} value={dato.descripcion_rol_usuarios}>Seleccionar Rol</option>        
            })
        }
    */ 
    
    //pedirle datos al back:
    componentDidMount(){
        request
            .get('http://localhost:3302/getRol')
            .end(function (err, res){
                if(err){
                    console.log('Roles de la BBDD: ', err);
                } else {
                    console.log('Erro al traer roles: ', res.body);
                }
            });
    }
        
    render() {
        return (
            
            <div>
                
                <Container>
                    <Col md={6}>
                    {/* <img src={require(`${myImg}`)} /> */}
                    
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <label>Correo </label>    
                            <input type="email" id="mail" onChange={this.upDateMail}></input>
                        </InputGroup.Prepend>
                    </InputGroup>
        
                    <Button type="submit" variant="dark" onClick={this.openModal}>Registrarse</Button>
                    </Col>   

                    <div>
                        <Modal isOpen={this.state.openModal}>
                            <ModalHeader>
                                <h3>Se envio un código al correo ingresado. Ingreselo y presione enviar. Gracias!</h3>
                            </ModalHeader>
                            <ModalBody>
                                <input type="text" id="cod" onChange={this.upDateCode}></input>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="submit" variant="dark" onClick={this.handleSubmitReg}>Enviar</Button>
                            </ModalFooter> 
                        </Modal>
                    </div>

                </Container>
               
            </div>
        )
    }
}

export default App
