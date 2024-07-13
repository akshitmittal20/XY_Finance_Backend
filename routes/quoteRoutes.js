const express = require('express');
const { getQuote, getTransactionParams } = require('../controllers/quoteController');
const { validate } = require('../utils/validate');
const { quoteSchema, paramsSchema } = require('../constants/schemas');
const { authenticateJWT } = require('../utils/authenticateJWT');

const router = express.Router();

router.post('/quotes', validate(quoteSchema), getQuote);
router.post('/params', validate(paramsSchema), getTransactionParams);

module.exports = router;
