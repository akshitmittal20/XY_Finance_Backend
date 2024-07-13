
# Bridge - MERN Stack Application

## Project Description
Bridge is a full-stack application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that interacts with the XY Finance API to fetch and display cryptocurrency data. The backend is built with Node.js and Express, and the frontend is developed using React.js.

## Features
- Fetch supported tokens for a specified blockchain
- Query XY Finance Quotes API for quotes
- Fetch transaction parameters when a user accepts a quote
- Fetch supported swap providers for a specified blockchain

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB (if database integration is required in the future)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/bridge.git
   ```

2. Navigate to the project directory:
   ```sh
   cd bridge
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Start the server:
   ```sh
   node server.js
   ```

## Project Structure

```
backend_api_XY_Finance/
├── controllers/
│   ├── tokenController.js
│   ├── quoteController.js
├── routes/
│   ├── tokenRoutes.js
│   ├── quoteRoutes.js
├── services/
│   ├── tokenService.js
│   ├── quoteService.js
├── utils/
│   ├── apiUtils.js
├── constants/
│   ├── apiConstants.js
├── server.js
└── package.json
```

### Directories and Files

- **controllers/**: Contains the logic for handling API requests.
  - `tokenController.js`: Handles requests related to supported chains, recommended tokens, and swap providers.
  - `quoteController.js`: Handles requests for fetching quotes and transaction parameters.

- **routes/**: Defines the API routes and maps them to controller functions.
  - `tokenRoutes.js`: Routes for fetching supported chains, recommended tokens, and swap providers.
  - `quoteRoutes.js`: Routes for fetching quotes and transaction parameters.

- **services/**: Contains the business logic for interacting with external APIs and processing data.
  - `tokenService.js`: Logic for fetching supported chains, recommended tokens, and swap providers.
  - `quoteService.js`: Logic for fetching quotes and transaction parameters.

- **utils/**: Utility functions used across the project.
  - `apiUtils.js`: Utility functions for API requests and responses.

- **constants/**: Contains constants used across the project.
  - `apiConstants.js`: API endpoint constants.

- **server.js**: The entry point of the application. Configures and starts the Express server.

- **package.json**: Lists project dependencies and scripts.

## Endpoints

### 1. Fetch Supported Chains
**Endpoint:** `/api/supportedChains`

**Method:** `GET`

**Description:** Fetches a list of supported blockchain networks.

**Response:**
```json
{
  "success": true,
  "supportedChains": [
    {
      "chainId": 1,
      "name": "ETHEREUM"
    },
    {
      "chainId": 56,
      "name": "BSC"
    },
    ...
  ]
}
```

### 2. Fetch Recommended Tokens
**Endpoint:** `/api/recommendedTokens`

**Method:** `GET`

**Query Parameters:**
- `chain`: Chain name (e.g., `ETHEREUM`)

**Description:** Fetches recommended tokens for a specified blockchain.

**Response:**
```json
{
  "success": true,
  "recommendedTokens": [
    {
      "address": "0x123...",
      "symbol": "ETH",
      "name": "Ethereum",
      "chainId": 1,
      "decimals": 18,
      "logoURI": "https://example.com/eth.png"
    },
    ...
  ]
}
```

### 3. Fetch Supported Swap Providers
**Endpoint:** `/api/supportedSwapProviders`

**Method:** `GET`

**Query Parameters:**
- `chainId`: Chain ID (e.g., `56` for BSC)

**Description:** Fetches supported swap providers for a specified blockchain.

**Response:**
```json
{
  "success": true,
  "supportedDexAggregators": [
    {
      "name": "OKX DEX",
      "logoUrl": "https://example.com/okx.png",
      "supportedDexes": [
        "OKX DEX"
      ]
    },
    ...
  ]
}
```

### 4. Get Quote
**Endpoint:** `/api/quote`

**Method:** `POST`

**Request Body:**
```json
{
  "srcChainId": "10",
  "srcQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "srcQuoteTokenAmount": "1000000000000000000",
  "dstChainId": "56",
  "dstQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "slippage": "1"
}
```

**Description:** Fetches a quote for the specified parameters.

**Response:**
```json
{
  "success": true,
  "routes": [
    {
      "srcQuoteTokenAddress": "0x123...",
      "srcQuoteTokenAmount": "1000000000000000000",
      ...
    }
  ]
}
```

### 5. Get Transaction Parameters
**Endpoint:** `/api/params`

**Method:** `POST`

**Request Body:**
```json
{
  "srcChainId": "10",
  "srcQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "srcQuoteTokenAmount": "1000000000000000000",
  "dstChainId": "56",
  "dstQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "slippage": "1",
  "bridgeProvider": "yBridge",
  "receiver": "0x9cEEEbdF49cF5DEa891C9D74f8ea03af2aCf284F",
  "srcBridgeTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "dstBridgeTokenAddress": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  "dstSwapProvider": "OKX DEX"
}
```

**Description:** Fetches transaction parameters when a user accepts a quote.

**Response:**
```json
{
  "success": true,
  "route": {
    ...
  },
  "tx": {
    "to": "0x123...",
    "data": "0xabc...",
    "value": "0xde0b6b3a7640000"
  }
}
```

## Testing
To test the endpoints, you can use Postman or any other API testing tool. 

### Example Test with Postman

1. **Fetch Supported Chains:**
   - Method: `GET`
   - URL: `http://localhost:3000/api/supportedChains`

2. **Fetch Recommended Tokens:**
   - Method: `GET`
   - URL: `http://localhost:3000/api/recommendedTokens?chain=ETHEREUM`

3. **Fetch Supported Swap Providers:**
   - Method: `GET`
   - URL: `http://localhost:3000/api/supportedSwapProviders?chainId=56`

4. **Get Quote:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/quote`
   - Body: 
   ```json
   {
     "srcChainId": "10",
     "srcQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
     "srcQuoteTokenAmount": "1000000000000000000",
     "dstChainId": "56",
     "dstQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
     "slippage": "1"
   }
   ```

5. **Get Transaction Parameters:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/params`
   - Body:
   ```json
   {
     "srcChainId": "10",
     "srcQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
     "srcQuoteTokenAmount": "1000000000000000000",
     "dstChainId": "56",
     "dstQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
     "slippage": "1",
     "bridgeProvider": "yBridge",
     "receiver": "0x9cEEEbdF49cF5DEa891C9D74f8ea03af2aCf284F",
     "srcBridgeTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
     "dstBridgeTokenAddress": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
     "dstSwapProvider": "OKX DEX"
   }
   ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Contact
For any queries or support, please contact [akshitmittal20@gmail.com](mailto:akshitmittal@gmail.com).

```

This `README.md` file now includes a section describing the structure of your backend project, in addition to the project description, installation instructions, detailed API endpoints, and testing instructions. Feel free to customize it further as needed.
