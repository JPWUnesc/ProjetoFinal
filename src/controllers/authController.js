const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

const router = express.Router();

function generateToken(params ={}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async(req, res)=>{
    const { email } = req.body;
    try{
        if(await User.findOne({ email })){
            return res.status(400).send({ success:false, message: 'Usuário já existente!'});
        }
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({   success: true, 
                            message:  'Registro salvo com sucesso!', 
                            content:  {
                                        user: user, 
                                        token: generateToken({ id: user.id }) 
                                    }
                                });
    }catch(err){
        console.log(err);
        return res.status(500).send({success:false, message : 'Não foi possivel salvar o usuário.'})
    }
});

router.post('/authenticate', async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ success:false, message: 'Usuário não encontrado!' });
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ success: false, message: 'Senha incorreta!' });

    user.password = undefined;

    return res.send({   success: true,
                        message: 'Usúario autenticado com sucesso!', 
                        content: {
                            user: user, 
                            token: generateToken({ id: user.id 
                            })
                        }  
                    });
});

module.exports = app => app.use('/auth', router);