'use strict'

const PassService = require('./services/pass.service');
const moment = require('moment');
const { hash } = require('bcrypt');

const miPass = "miContraseña";
const badPass = "miOtraContraseña";
const usuario = {
    _id: '123456789', 
    email: 'miguelrotes56@gmail.com',
    displayName: 'Miguel Ángel',
    password: miPass,
    signUpdate: moment().unix(),
    lastLogin: moment().unix()
};

console.log(usuario);

//Encriptamos el pass
PassService.encriptaPassword(usuario.password).then(hash => {
    usuario.password = hash;
    console.log(usuario);

    //Verificamos el pass
    PassService.comparaPassword(miPass, usuario.password).then(isOk => {
        if(isOk) {
            console.log(`p1: El pass es correcto`);
        }else{
            console.log(`p1: El pass no es correcto`);
        }
    }).catch(err => console.log(err));

        //Verificamos el pass falso
        PassService.comparaPassword(badPass, usuario.password).then(isOk => {
            if(isOk) {
                console.log(`p2: El pass es correcto`);
            }else{
                console.log(`p2: El pass no es correcto`);
            }
        }).catch(err => console.log(err));

})