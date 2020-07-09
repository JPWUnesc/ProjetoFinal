const mongoose = require('../database');

const CartaoSchema = new mongoose.Schema({
    nome : {
        type: String,
        require: true
    },
    descricao : {
        type: String
    },
    numero:{
        type: String
    },
    modalidade: {
        type: String,
        enum : ['DEBITO', 'CREDITO'],
        require: true
    },
    usuario : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

const Cartao = mongoose.model('Cartao', CartaoSchema);

module.exports = Cartao;