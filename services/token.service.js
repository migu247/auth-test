'use strict'

const { promise } = require('bcrypt/promises');
const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET = require('../config').secret;
const EXP_TIME = require('../config').tokenExpTMP;

// crearToken
//Formato JWT
// HEADER.PAYLOAD.VERIFY_SIGNATURE
//
// Donde:
//  HEADER ( Objeto JSON con el al...)
//  {
//     alg: ...
//  ...
//      VERIFY.SIGNATURE = HMACSHA256( base64UrlEncode(HEAD)+'.'+base64UrlEncode(PAYLOAD, SECRET))
//

function crearToken(user){
    const payload ={
        sub: user._id, 
        iat: moment().unix(),
        exp: moment().add(EXP_TIME, 'minutos').unix()

    };
    return jwt.encode(payload, SECRET);
}

// decodificaToken
//
// devuelve el identificador de user

function decodificaToken(token){
    return new Promise( (resolve, reject) => {
        try {
            const payload = jwt.decode(token, SECRET, true);
            if(payload.exp < moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
                
            }
            resolve(payload.sub);

        }catch{
            reject({
                status: 500,
                message: 'El token no vale'
            });
        }
    });
}

module.exports = {
    crearToken, 
    decodificaToken
};