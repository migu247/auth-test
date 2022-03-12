'use strict'

const TokenService = require('./services/token.service');
const moment = require('moment');


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

//Creamos un token
const token = TokenService.crearToken(usuario);
console.log(token);

//Decodificamos token

TokenService.decodificaToken(token).then(userId => {
    return console.log(`ID1: ${userId}`);
}).catch( err => console.log(err));

//Decodificamos token erroneo
const badtoken = 'eyJhbGciOiJIUzI1IsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
TokenService.decodificaToken(badtoken).then(userId => {
    return console.log(`ID2: ${userId}`);
}).catch( err => console.log(err));

