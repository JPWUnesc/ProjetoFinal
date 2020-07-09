const mongoose = require('../database');

const ObjetivoSchema = new mongoose.Schema({
    nome : {
        type: String,
        require: true
    },
    descricao : {
        type: String
    },
    valor:{
        type: Number
    },
    usuario : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

const Objetivo = mongoose.model('Objetivo', ObjetivoSchema);

module.exports = Objetivo;