//librerias de node:
const express = require('express');
const router = express.Router();
const db_pool = require('../dbConection');
const sendMail = require('../mails/checkMail')
const helper = require('../helpers/helpers');
const global = require('../helpers/globales');
const bcrypt = require('bcrypt');

//Renderizar desde React:
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const login = require('../client/component/login/Login');
const Registro  = require('../client/component/registro/Registro');

//metodos de ayuda:
const help = new helper(); 
const correo = new sendMail();
const gb = new global();

//Get user rol:
router.get('/getRol', async (req, res) => {
    var roles = await db_pool.query(`select * from eludumdb.rol_usuarios`);
    res.json(roles);
});


router.get('/Registro', (req, res) => {
    var html = ReactDOMServer.renderToString(
        React.createElement(Registro)
    );
    console.log(Registro);
    res.send(html);
    console.log('Hola lpm!');
});


router.post('/getUser', async (req,res) => {
    var getPass;
    var passCompare = false;
    var passError = [{error: 'Error'}];

    var passUser = await db_pool.query(`select password from eludumdb.usuarios where mail = ?`, req.body.user);

    if (passUser[0]){ getPass = passUser[0].password; }
    
    if (getPass) { passCompare = await bcrypt.compare(req.body.pass, getPass); }

    if (passCompare == true) {  
        console.log('Deberia llevarlo a los juegos')
        passError = [{error: 'Ok'}];
        res.json(passError);
    } else {
        res.json(passError);
    }
}); 

router.post('/deleteUser', async (req, res) => {
    var getPass;
    var passCompare = false;
    var passError = [{error: 'Error'}];

    var passUser = await db_pool.query(`select password from eludumdb.usuarios where mail = ?`, req.body.user);

    if (passUser[0]){ getPass = passUser[0].password; }
    
    if (getPass) { passCompare = await bcrypt.compare(req.body.pass, getPass); }

    if (passCompare == true) { 
        //el ususario existe, entonces lo elimino:
        await db_pool.query(`delete from eludumdb.usuarios where password = ?`, getPass);
        passError = [{error: 'Ok'}];
        res.json(passError);
    } else {
        //Mando error para indicar que no se encotro el usuario para eleminar
        res.json(passError);
    }
});

router.post('/sendMail', async (req, res) => {
    var cod = help.generateCode();
    var mailCod = req.body;

    gb.varGlobales.corre = mailCod.mail
    
    await correo.newMailDelivery(mailCod.mail, cod);
    
    gb.varGlobales.codigo = cod;

});

router.post('/captureCod', async (req, res) => {
    gb.varGlobales.codigo = await {num : req.body.numero};
    res.json(gb.varGlobales.codigo);
});

//Nuevos usuarios:
router.post('/setNewUser', async (req, res) => {
    var passError = [{error: 'Error'}];
    var dataNewUser = req.body;
    var num = parseInt(dataNewUser.code);
    var cod = parseInt(gb.varGlobales.codigo);

    if (cod === num ){
        let setRoles = ['Orquestador', 'Tutor', 'Jugador'];
        var rol = 0;

        for (var i=0; i < setRoles.length; i++){
            if (setRoles[i] == dataNewUser.rol){ 
                rol = i+1 
            };
        }

        let password = await bcrypt.hash(dataNewUser.pass, 10);

        let nombre_usuario =  dataNewUser.firstName 
        let apellido_usuario = dataNewUser.lastName
        let fecha_nacimiento = dataNewUser.dateBirth
        let mail = gb.varGlobales.corre
        let rol_usuarios_id_rol_usuarios = rol

        try {
            const setInsert = {nombre_usuario, apellido_usuario, fecha_nacimiento, password, mail, rol_usuarios_id_rol_usuarios}
            //Chequeo que el mail no existe en la base:
            var checkUser = await db_pool.query(`select mail from eludumdb.usuarios where mail = ?`, mail);
           
            if (checkUser.length == 0) {
                await db_pool.query('insert into eludumdb.usuarios set ?', [setInsert]);
                //Mensaje de usuario guardado
                passError = [{error: 'Ok'}];
                res.json(passError);
            } else {
                //Si es distinto de 0 enviar mensaje de usuario existente
                passError = [{error: 'Error'}];
                res.json(passError);
            }        
        } catch(e) {
            res.status(500).send(`Error viene de router: ${e}`);
        }
    } else {
        passError = [{error: 'Cod error'}];
        res.json(passError);
    }
});

module.exports = router;