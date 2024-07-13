const express = require('express');
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', quoteRoutes);
app.use('/api', tokenRoutes);

module.exports = app;
