const express = require('express');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();
// Create the service wrapper
const nlu = new NaturalLanguageUnderstandingV1({
  version: '2021-10-15',
  authenticator: new IamAuthenticator({
    apikey: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB',
  }),
  url: "https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522",
});

// setup body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Bootstrap application settings
require('./config/express')(app);

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/analyze', (req, res, next) => {
  if (process.env.SHOW_DUMMY_DATA) {
    res.json(require('./payload.json'));
  } else {
    nlu.analyze(req.body, (err, results) => {
      if (err) {
        return next(err);
      }
      return res.json({ query: req.body.query, results: results.result });
    });
  }
});

module.exports = app;