'use strict'

//      formato de hash: 
//      $2b$10$9aCAVDEsbc5blE/OT4EnP.V1FZKfHMnVx4QkgZ6OFf9KDWLwUrd1S
//      ***---***********************+++++++++++++++++++++++++++++++
//      Alg Cost        Salt                    Hash
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');

const miPass = "miContraseña";
const badPass = "miOtraContraseña";

// salt = bcrypt.salt(10);
// hash = bcrypt.hash( miPass, salt);
// db.users.update(id, hash);
// db.account.hash.update(id, salt);

//Creamos Salt
bcrypt.genSalt(15, (err, salt) => {
    console.log(`Salt 1: ${salt}`);

    //Utilizamos el Salt para generar un hash

    bcrypt.hash(miPass, salt, (err, hash) => {
        if(err) console.log(err);
        else console.log(`Hash 1: ${hash}`);
    });
});

// Creamos el hash directamente
bcrypt.hash(miPass, 10, (err, hash) => {
    if(err) console.log(err);
    else{ 
        console.log(`Hash 2: ${hash}`);

        // Comprobamos utilizando la contraseña correcta
        bcrypt.compare(miPass, hash, (err, result)=>{
            console.log(`Result 2.1: ${result}`);
        });

        bcrypt.compare(miPass, badPass, (err, result)=>{
            console.log(`Result 2.2: ${result}`);
        });
    }
});

