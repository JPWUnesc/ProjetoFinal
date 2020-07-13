const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({success: false, message: "Token não disponibilizado!"})
    }

    const parts = authHeader.split(' ');
    
    if(!(parts.length === 2)){
        return res.status(401).send({success: false, message: "Token informado de maneira incorreta!"})
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({success: false, message: "Token informado de maneira incorreta!"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({success: false, message: "Token invalido!"})
        }

        req.query.limit = ((req.query.limit === undefined)  ? 10 : parseInt(req.query.limit));

        req.userId = decoded.id;
        return next();
    });

}