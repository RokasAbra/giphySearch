// import NaturalLanguageUnderstandingV1 from 'ibm-watson/discovery/v1';
// import { IamAuthenticator } from 'ibm-watson/auth';

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2022-04-07',
  authenticator: new IamAuthenticator({
    apikey: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB',
  }),
  serviceUrl: 'https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522',
});

const analyzeParams = {
  'url': 'www.ibm.com',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2,
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2,
    },
  },
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });


 
 

    