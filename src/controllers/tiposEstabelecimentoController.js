const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const TipoEstabelecimento = require('../models/TipoEstabelecimento');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{ 
        var filter = { usuario: req.userId };
        if (req.query.search) {
        filter.nome = { $regex: ".*" + req.query.search + ".*" };
        }
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        const tiposEstabelecimento = await TipoEstabelecimento.find(filter)
                                    .limit(limit)
                                    .skip(offset)
                                    .sort(req.query.order);

        return res.send({
                    success: true, 
                    total: await TipoEstabelecimento.countDocuments(filter),
                    message: 'Tipos de estabelecimento listados com sucesso!', 
                    actualPage: limit > 0 && offset > 0
                      ? limit /
                        (offset == 0 ? limit : offset)
                      : 0,
                    content: tiposEstabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel listas os tipos de estabelecimento.'})
    }
});

router.get('/:tipoEstabelecimentoId', async (req, res) => {
    try{
        const tipoEstabelecimento = await TipoEstabelecimento.findById(req.params.tipoEstabelecimentoId);

        return res.send({
                    success: true, 
                    message: tipoEstabelecimento !== null ? 'Tipos de estabelecimento encontrado com sucesso!' : 'Tipos de estabelecimento não localizado!', 
                    content: tipoEstabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel encontrar o tipo de estabelecimento.'})
    }
});

router.post('/', async (req, res) => {
    try{
        const { nome } = req.body;

        if(await TipoEstabelecimento.findOne({ nome, usuario: req.userId })){
            return res.status(400).send({ success:false, message: 'Este tipo de equipamento já existe!'});
        }
        const tipoEstabelecimento = await TipoEstabelecimento.create({ ...req.body, usuario: req.userId });

        return res.send({
                    success: true, 
                    message: 'Tipo de estabelecimento criado com sucesso!', 
                    content: tipoEstabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel salvar o tipo de estabelecimento.'})
    }
});

router.put('/:tipoEstabelecimentoId', async (req, res) => {
    try{
        const { nome } = req.body;

        if(await TipoEstabelecimento.findOne({ nome, _id:{$ne: req.params.tipoEstabelecimentoId} })){
            return res.status(400).send({ success:false, message: 'Este nome de tipo de estabelecimento já existe!'});
        }

        const tipoEstabelecimento = await TipoEstabelecimento.findByIdAndUpdate(req.params.tipoEstabelecimentoId, req.body, {new: true});

        return res.send({
                    success: true, 
                    message: 'Tipo de estabelecimento alterado com sucesso!', 
                    content: tipoEstabelecimento
                });

    }catch(err){
        console.log(err);
        return res.status(400).send({success: false, message: 'Não foi possivel salvar o tipo de estabelecimento.'})
    }
});

router.delete('/:tipoEstabelecimentoId', async (req, res) => {
    try{
        await TipoEstabelecimento.findByIdAndRemove(req.params.tipoEstabelecimentoId);

        return res.send({
                    success: true, 
                    message: 'Tipo de estabelecimento removido com sucesso!'
                });

    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/tiposEstabelecimento', router);