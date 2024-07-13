const axios = require('axios');

exports.fetchQuote = async (srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage) => {
  const response = await axios.get('https://aggregator-api.xy.finance/v1/quote', {
    params: {
      srcChainId,
      srcQuoteTokenAddress,
      srcQuoteTokenAmount,
      dstChainId,
      dstQuoteTokenAddress,
      slippage
    }
  });
  return response.data;
};



// exports.fetchTransactionParams = async (srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage, bridgeProvider, receiver, srcBridgeTokenAddress, dstBridgeTokenAddress, swapProviders) => {
//   console.log("Logging all the paramters");
//   console.log({ srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage, bridgeProvider, receiver, srcBridgeTokenAddress, dstBridgeTokenAddress, swapProviders });
//   const response = await axios.get('https://aggregator-api.xy.finance/v1/buildTx', {
//     params: {
//       srcChainId,
//       srcQuoteTokenAddress,
//       srcQuoteTokenAmount,
//       dstChainId,
//       dstQuoteTokenAddress,
//       slippage,
//       bridgeProvider,
//       receiver,
//       srcBridgeTokenAddress,
//       dstBridgeTokenAddress,
//       swapProviders // Make sure to include swapProviders here
//     }
//   });
//   return response.data;
// }; 


exports.fetchTransactionParams = async (
  srcChainId,
  srcQuoteTokenAddress,
  srcQuoteTokenAmount,
  dstChainId,
  dstQuoteTokenAddress,
  slippage,
  bridgeProvider,
  receiver,
  srcBridgeTokenAddress,
  dstBridgeTokenAddress,
  srcSwapProvider,
  dstSwapProvider,
) => {
  const params = {
    srcChainId,
    srcQuoteTokenAddress,
    srcQuoteTokenAmount,
    dstChainId,
    dstQuoteTokenAddress,
    slippage,
    bridgeProvider,
    receiver,
    srcBridgeTokenAddress,
    dstBridgeTokenAddress,
  };

  // Conditionally add swap providers based on whether they are needed
  if (srcQuoteTokenAddress !== srcBridgeTokenAddress && srcSwapProvider) {
    params.srcSwapProvider = srcSwapProvider;
  }

  if (dstQuoteTokenAddress !== dstBridgeTokenAddress && dstSwapProvider) {
    params.dstSwapProvider = dstSwapProvider;
  }

  console.log('Requesting transaction params with:', params);

  try {
    const response = await axios.get('https://aggregator-api.xy.finance/v1/buildTx', { params });
    console.log('Response from XY Finance API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction parameters:', error.response ? error.response.data : error.message);
    throw error;
  }
};