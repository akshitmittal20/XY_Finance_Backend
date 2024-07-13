const app = require('./app');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
