const express = require('express');
const messages = require('./app/message');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/messages', messages);

app.listen(port);