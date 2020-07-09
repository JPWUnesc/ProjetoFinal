const mongoose = require('../database');

const TipoEstabelecimentoSchema = new mongoose.Schema({
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
    }
});

const TipoEstabelecimento = mongoose.model('TipoEstabelecimento', TipoEstabelecimentoSchema);

module.exports = TipoEstabelecimento;