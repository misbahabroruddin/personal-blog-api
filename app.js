const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use('/api/v1', router);
app.use(errorHandler);

app.get('/ping', function (req, res) {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
