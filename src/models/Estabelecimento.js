const mongoose = require('../database');

const EstabelecimentoSchema = new mongoose.Schema({
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
    tipoEstabelecimento : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TipoEstabelecimento",
        require: true
    }
});

const Estabelecimento = mongoose.model('Estabelecimento', EstabelecimentoSchema);

module.exports = Estabelecimento;