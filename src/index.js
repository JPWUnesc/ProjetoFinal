const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    res.send('Ok');
});

require('./controllers/authController')(app);
require('./controllers/tiposEstabelecimentoController')(app);
require('./controllers/estabelecimentoController')(app);
require('./controllers/objetivoController')(app);
require('./controllers/cartaoController')(app);

app.listen(3000);