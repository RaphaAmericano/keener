const express = require('express');
const port = process.env.NODE_PORT | 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
require('./database/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    // origin: ['http://localhost:4200'],
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(routes);
app.listen(port);