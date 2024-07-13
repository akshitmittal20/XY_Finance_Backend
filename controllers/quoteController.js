const quoteService = require('../services/quoteService');

exports.getQuote = async (req, res) => {
  const { srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage } = req.body;

  try {
    const quote = await quoteService.fetchQuote(srcChainId, srcQuoteTokenAddress, srcQuoteTokenAmount, dstChainId, dstQuoteTokenAddress, slippage);
    res.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).send('Error fetching quote');
  }
};

exports.getTransactionParams = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const params = await quoteService.fetchTransactionParams(
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
    );
    res.json(params);
  } catch (error) {
    console.error('Error fetching transaction parameters:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching transaction parameters');
  }
};