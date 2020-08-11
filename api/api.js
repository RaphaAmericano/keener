const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

require('./controllers/authController')(app);
require('./controllers/produtosController')(app);
require('./controllers/movimentacoesController')(app);

app.get('/', (req, res) => {
    res.send('OK')
})  

app.listen(3000);