const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Movimentacao = require('../models/Movimentacao');
const mongoose = require('../database');
const service = require('../services/movimentacaoServices');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{     
        var filter = { usuario: req.userId };
        if (req.query.search) {
        filter.nome = { $regex: ".*" + req.query.search + ".*" };
        }
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        const movimentacao = await Movimentacao.find(filter)
                                    .limit(limit)
                                    .skip(offset)
                                    .sort(req.query.order);

        return res.send({
                    success: true, 
                    total: await Movimentacao.countDocuments(filter),
                    message: 'Movimentacões listadas com sucesso!', 
                    actualPage: limit > 0 && offset > 0
                      ? limit /
                        (offset == 0 ? limit : offset)
                      : 0, 
                    content: movimentacao
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel listas as movimentações.'})
    }
});

router.get('/graph', async (req, res) => {
    try{

        const movimentacao = await Movimentacao.aggregate(service.graphExpression(req, req.query.by == 'day'));

        return res.send({
                    success: true, 
                    message: 'Movimentacões listadas com sucesso!', 
                    content: movimentacao
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel listas as movimentações.'})
    }
});

router.get('/carteira', async (req, res) => {
    try{

        const movimentacao = await Movimentacao.aggregate([ 
        {$match: {  
                usuario : new mongoose.Types.ObjectId(req.userId)
        }
    },
    { 
        $group: {
        _id: {usuario: '$usuario'},
        acresimo:   { 
            $sum: { 
                $switch: { 
                    branches: [ 
                        { 
                            "case": { "$eq": [ "$tipo", 'ACRESCIMO' ] }, 
                            "then": "$valor"
                        }
                    ], 
                    "default": 0 
                }
            }
        },
        decrescimo: { 
                    $sum: { 
                        $switch: { 
                            branches: [ 
                                { 
                                    "case": { "$eq": [ "$tipo", 'DECRESCIMO' ] }, 
                                    "then": "$valor"
                                }
                            ], 
                            "default": 0 
                        }
                    }
                }
            }
        }
    ]);

        return res.send({
                    success: true, 
                    message: 'Movimentacões listadas com sucesso!', 
                    content: movimentacao[0]
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel listas as movimentações.'})
    }
});



router.get('/:id', async (req, res) => {
    try{
        const movimentacao = await Movimentacao
                                        .findById(req.params.id);

        return res.send({
                    success: true, 
                    message: movimentacao !== null ? 'Movimentacão encontrada com sucesso!' : 'Movimentacão não localizado!', 
                    content: movimentacao
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel encontrar a movimentacão.'})
    }
});

router.post('/', async (req, res) => {
    try{
        const { nome } = req.body;

        if(await Movimentacao.findOne({ nome, usuario: req.userId })){
            return res.status(400).send({ success:false, message: 'Esta movimentacão já existe!'});
        }

        if(req.body.estabelecimento && typeof req.body.estabelecimento !== 'object'){
            req.body.estabelecimento = { "_id": req.body.estabelecimento};
            console.log(req.body);
        }

        if(req.body.cartao && typeof req.body.cartao !== 'object'){
            req.body.cartao = { "_id": req.body.cartao};
            console.log(req.body);
        }

        const movimentacao = await Movimentacao.create({ ...req.body, usuario: req.userId });

        return res.send({
                    success: true, 
                    message: 'Movimentacão criada com sucesso!', 
                    content: movimentacao
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel salvar a movimentação.'})
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { nome } = req.body;

        if(await Movimentacao.findOne({ nome, _id:{$ne: req.params.id} })){
            return res.status(400).send({ success:false, message: 'Este nome de movimentação já existe!'});
        }

        if(req.body.estabelecimento && typeof req.body.estabelecimento !== 'object'){
            req.body.estabelecimento = { "_id": req.body.estabelecimento};
            console.log(req.body);
        }

        if(req.body.cartao && typeof req.body.cartao !== 'object'){
            req.body.cartao = { "_id": req.body.cartao};
            console.log(req.body);
        }

        const movimentacao = await Movimentacao.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.send({
                    success: true, 
                    message: 'Movimentacão alterada com sucesso!', 
                    content: movimentacao
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel salvar a movimentacão.'})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Movimentacao.findByIdAndRemove(req.params.id);

        return res.send({
                    success: true, 
                    message: 'Movimentacão removida com sucesso!'
                });

    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/movimentacoes', router);