const mongoose = require('../database');

const MovimentacaoSchema = new mongoose.Schema({
    nome : {
        type: String,
        require: true
    },
    descricao : {
        type: String
    },
    usuario : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    estabelecimento : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "estabelecimentos"
    },
    cartao : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartoes"
    },
    tipo: {
        type: String,
        enum : ['ACRESCIMO', 'DECRESCIMO'],
        require: true
    },
    valor:{
        type: Number,
        require: true
    },
});

const Movimentacao = mongoose.model('Movimentacao', MovimentacaoSchema);

module.exports = Movimentacao;