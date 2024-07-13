const tokenService = require('../services/tokenService');

exports.getSupportedChains = async (req, res) => {
  try {
    const chains = await tokenService.fetchSupportedChains();
    res.json(chains);
  } catch (error) {
    console.error('Error fetching supported chains:', error);
    res.status(500).send('Error fetching supported chains');
  }
};

exports.getRecommendedTokens = async (req, res) => {
  const { chain } = req.query;

  try {
    const tokens = await tokenService.fetchRecommendedTokens(chain);
    res.json(tokens);
  } catch (error) {
    console.error('Error fetching recommended tokens:', error);
    res.status(500).send('Error fetching recommended tokens');
  }
};



exports.getSupportedSwapProviders = async (req, res) => {
  const { chainId } = req.query;

  try {
    const providers = await tokenService.fetchSupportedSwapProviders(chainId);
    res.json(providers);
  } catch (error) {
    console.error('Error fetching supported swap providers:', error);
    res.status(500).send('Error fetching supported swap providers');
  }
};