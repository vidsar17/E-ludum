import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle} from 'reactstrap';
import { Button, InputGroup, FormControl,Container,DropdownButton,Col,Dropdown,DropdownItem } from 'react-bootstrap';
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
            code: this.state.code,
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
    // componentDidMount(){
    //     request
    //         .get('http://localhost:3302/getRol')
    //         .end(function (err, res){
    //             if(err){
    //                 console.log('Erro al traer roles: ', err);
    //             } else {
    //                 console.log('Roles de la BBDD: ', res.body);
    //             }
    //         });
    // }
        
    render() {

        const dropRol = {
            marginBottom :"30%"
           
            };



        return (
            
            <div>
                
         
                
                
                <div className="modal-dialog login">
		<div className="modal-content">
			<div className="modal-header">
            <div class="avatar">
					<img src={''} alt=""></img>
				</div>
					
				<h4 class="modal-title">Registro</h4>	
               
			</div>
			<div className="modal-body">
				
					<div className="form-group">
			
                        <input type="email" className="form-control" id="nombre" placeholder="Nombre" required="required" onChange={this.upDateFirstName}></input>	
					</div>
					<div class="form-group">
						
                       
                        <input type="password" className="form-control" placeholder="Apellido" id="apellido" onChange={this.upDateLastName}></input>
					</div>  
                    <div className="form-group">
			
            <input type="date" className="form-control" id="nacimiento" placeholder="Nacimiento" required="required" onChange={this.upDateDateBirth}></input>	
        </div>
        <div class="form-group">
            
           
            <input type="password" className="form-control" placeholder="Pass" id="pass" onChange={this.upDatePass}></input>
        </div>  
        <div class="form-group">
            
           
            <input type="email" className="form-control" placeholder="Email" id="mail" onChange={this.upDateMail}></input>
        </div> 

        <DropdownButton style={dropRol} id="dropRol" title="Seleccionar Rol">
            <Dropdown.Item value="1">Orquestador</Dropdown.Item>
            <Dropdown.Item value="2">Jugador</Dropdown.Item>
            <Dropdown.Item value="3">Tutor</Dropdown.Item>
            </DropdownButton>

					<div className="form-group">
						<button type="submit" onClick={this.openModal}  className="btn btn-primary btn-lg btn-block login-btn">Registrarse</button>
                     
					</div>
				
			</div>
		
		</div>

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
	</div>

    
               
 
            </div>
        )
    }
}

export default App
