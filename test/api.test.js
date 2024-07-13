const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your express app is in app.js
const { expect } = chai;

chai.use(chaiHttp);

describe('API Endpoints', () => {
  describe('GET /api/supportedChains', () => {
    it('should fetch supported chains', (done) => {
      chai.request(app)
        .get('/api/supportedChains')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body.supportedChains).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/recommendedTokens', () => {
    it('should fetch recommended tokens for a specific chain', (done) => {
      chai.request(app)
        .get('/api/recommendedTokens')
        .query({ chain: 'ethereum' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body.recommendedTokens).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/quotes', () => {
    it('should fetch a quote for a specific transaction', (done) => {
      chai.request(app)
        .post('/api/quotes')
        .send({
          srcChainId: '10',
          srcQuoteTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          srcQuoteTokenAmount: '1000000000000000000',
          dstChainId: '56',
          dstQuoteTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          slippage: '1'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body.routes).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/params', () => {
    it('should fetch transaction parameters when user accepts the quote', (done) => {
      chai.request(app)
        .post('/api/params')
        .send({
          srcChainId: '10',
          srcQuoteTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          srcQuoteTokenAmount: '1000000000000000000',
          dstChainId: '56',
          dstQuoteTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          slippage: '1',
          bridgeProvider: 'yBridge',
          receiver: '0xYourReceiverAddressHere'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body.tx).to.be.an('object');
          done();
        });
    });
  });
});
