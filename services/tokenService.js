const axios = require('axios');

exports.fetchSupportedChains = async () => {
  const response = await axios.get('https://aggregator-api.xy.finance/v1/supportedChains');
  return response.data;
};

exports.fetchRecommendedTokens = async (chain) => {
  const response = await axios.get(`https://aggregator-api.xy.finance/v1/recommendedTokens?chain=${chain}`);
  return response.data;
};



exports.fetchSupportedSwapProviders = async (chainId) => {
  const response = await axios.get('https://aggregator-api.xy.finance/v1/supportedSwapProviders');
  console.log('Full response from supportedSwapProviders:', response.data);

  const providers = response.data.supportedDexAggregators
    .filter(provider => provider.supportedChains.some(chain => chain.chainId === parseInt(chainId, 10)))
    .map(provider => ({
      name: provider.name,
      logoUrl: provider.logoUrl,
      supportedDexes: provider.supportedChains.find(chain => chain.chainId === parseInt(chainId, 10)).supportedDexes
    }));

  console.log('Filtered providers:', providers);
  return providers;
};