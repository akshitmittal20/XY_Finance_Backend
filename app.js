const express = require('express');
const quoteRoutes = require('./routes/quoteRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();

app.use(express.json());

app.use('/api', quoteRoutes);
app.use('/api', tokenRoutes);

module.exports = app;
