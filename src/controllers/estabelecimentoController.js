const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Estabelecimento = require('../models/Estabelecimento');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{     
        var filter = { usuario: req.userId };
        if (req.query.search) {
        filter.nome = { $regex: ".*" + req.query.search + ".*" };
        }
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        const estabelecimento = await Estabelecimento.find(filter)
                                    .limit(limit)
                                    .skip(offset)
                                    .sort(req.query.order);

        return res.send({
                    success: true, 
                    total: await Estabelecimento.countDocuments(filter),
                    message: 'Estabelecimentos listados com sucesso!', 
                    actualPage: limit > 0 && offset > 0
                      ? limit /
                        (offset == 0 ? limit : offset)
                      : 0, 
                    content: estabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel listas os estabelecimento.'})
    }
});

router.get('/:estabelecimentoId', async (req, res) => {
    try{
        const estabelecimento = await Estabelecimento
                                        .findById(req.params.estabelecimentoId)
                                        .populate(["tipoEstabelecimento"]);

        return res.send({
                    success: true, 
                    message: estabelecimento !== null ? 'Estabelecimento encontrado com sucesso!' : 'Estabelecimento não localizado!', 
                    content: estabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel encontrar o estabelecimento.'})
    }
});

router.post('/', async (req, res) => {
    try{
        const { nome } = req.body;

        if(await Estabelecimento.findOne({ nome, usuario: req.userId })){
            return res.status(400).send({ success:false, message: 'Este estabelecimento já existe!'});
        }

        console.log(req.body);
        if(req.body.tipoEstabelecimento && typeof req.body.tipoEstabelecimento !== 'object'){
            
            console.log('Aquiii');
            req.body.tipoEstabelecimento = { "_id": req.body.tipoEstabelecimento};
            console.log(req.body);
        }

        const estabelecimento = await Estabelecimento.create({ ...req.body, usuario: req.userId });

        return res.send({
                    success: true, 
                    message: 'Estabelecimento criado com sucesso!', 
                    content: estabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel salvar o estabelecimento.'})
    }
});

router.put('/:estabelecimentoId', async (req, res) => {
    try{
        const { nome } = req.body;

        if(await Estabelecimento.findOne({ nome, _id:{$ne: req.params.estabelecimentoId} })){
            return res.status(400).send({ success:false, message: 'Este nome do estabelecimento já existe!'});
        }

        console.log(req.body);
        if(req.body.tipoEstabelecimento && typeof req.body.tipoEstabelecimento !== 'object'){
            
            console.log('Aquiii');
            req.body.tipoEstabelecimento = { "_id": req.body.tipoEstabelecimento};
            console.log(req.body);
        }

        const estabelecimento = await Estabelecimento.findByIdAndUpdate(req.params.estabelecimentoId, req.body, {new: true});

        return res.send({
                    success: true, 
                    message: 'Estabelecimento alterado com sucesso!', 
                    content: estabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel salvar o estabelecimento.'})
    }
});

router.delete('/:estabelecimentoId', async (req, res) => {
    try{
        await Estabelecimento.findByIdAndRemove(req.params.estabelecimentoId);

        return res.send({
                    success: true, 
                    message: 'Estabelecimento removido com sucesso!'
                });

    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/estabelecimentos', router);