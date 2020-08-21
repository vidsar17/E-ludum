    import React from 'react';
import { render } from 'react-dom';
import { Button, InputGroup, FormControl, Container, Col, Nav } from 'react-bootstrap';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link 
} from "react-router-dom";
import Login from './component/login/Login';
import Registro from './component/registro/Registro';
import Juego from './component/juego/juego';
import UserDelete from './component/userDelete/userDelete';
import request from 'superagent';
import { ModalBody } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
//import { TRUE } from 'node-sass';


//function App() {
class App extends React.Component {
    constructor(props) {
        super(props);
       
    }


    render() {
        return (
            <Router>
                <div>

                <Menu isOpen={true} >
            <a id="home"  className="menu-item colortext"><Link to="/Login">LOGIN</Link></a>
            <a id="about" className="menu-item colortext"><Link to="/Registro">REGISTRO</Link></a>
            <a id="contact" className="menu-item colortext" ><Link to="/juego">JUEGO</Link></a>
            <a id="contact" className="menu-item colortext" > <Link to="/Eliminar"> ELIMINAR</Link></a>
        
          </Menu>


                  
                    <hr/> 
                    <Switch>
                        <Route path="/Login">
                            <Login/>
                        </Route>
                        <Route path="/Registro">
                            <Registro/>
                        </Route>
                        <Route path="/juego">
                            <Juego/>
                        </Route>
                        <Route path="/Eliminar">
                            <UserDelete/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App

