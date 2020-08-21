const bcrypt = require('bcrypt');
const db_pool = require('../dbConection');

class AuxFunction {

    //genero el código:
    generateCode() {
        let random = Math.random();
        let numStr = random.toString();

        return numStr.substr(14);
    }; 

    creatHash (pass, mail) {
        const passUser = db_pool.query(`select password from eludumdb.usuarios where mail = ?`, mail);
        const validatePass = bcrypt.compare(pass, passUser[0]);

        if (validatePass) {
            return true
        } else {
            return false
        }
    };

};

module.exports = AuxFunction;