const { z } = require('zod');

exports.quoteSchema = z.object({
  srcChainId: z.string(),
  srcQuoteTokenAddress: z.string(),
  srcQuoteTokenAmount: z.string(),
  dstChainId: z.string(),
  dstQuoteTokenAddress: z.string(),
  slippage: z.string(),
});

exports.paramsSchema = z.object({
  srcChainId: z.string(),
  srcQuoteTokenAddress: z.string(),
  srcQuoteTokenAmount: z.string(),
  dstChainId: z.string(),
  dstQuoteTokenAddress: z.string(),
  slippage: z.string(),
  bridgeProvider: z.string(),
  receiver: z.string(),
  srcBridgeTokenAddress: z.string(),
  dstBridgeTokenAddress: z.string(),
  srcSwapProvider: z.string().optional(),
  dstSwapProvider: z.string().optional()
});