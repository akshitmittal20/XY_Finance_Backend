const express = require('express');
const { getSupportedChains, getRecommendedTokens, getSupportedSwapProviders } = require('../controllers/tokenController');

const router = express.Router();

router.get('/supportedChains', getSupportedChains);
router.get('/recommendedTokens', getRecommendedTokens);
router.get('/supportedSwapProviders', getSupportedSwapProviders);

module.exports = router;
