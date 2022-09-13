import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

const Giphy = () => {

   
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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
const [nlp, setNlp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "nLAwTq1WjbSJH9C9lAps3XE0vMJclLJB",
            limit: 100,
          },
        });
        console.log(results);
        setData(results.data.data);
      } catch (error) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} alt="#" />
        </div>
      );
    });
  };

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in few minutes
        </div>
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "nLAwTq1WjbSJH9C9lAps3XE0vMJclLJB",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };


//   fetch('http://https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522/v1/analyze?version=2019-07-12', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + btoa('apikey: vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB')
//     },
//     body: JSON.stringify({
//         'text': {search},
//         'features': {
//             'sentiment': {
//                 'targets': [
                    
//                 ]
//             },
//             'keywords': {
//                 'emotion': true
//             }
//         }
//     })
// });


// useEffect(() => {
//   const fetch = async () => {
    
//     try {
//       const results = await axios.post(
//         'https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522/v1/analyze?version=2019-07-12/v1/analyze',
//         {
//             'text': search,
//             'features': {
//                 'sentiment': {
//                     'targets': [
//                     ]
//                 },
//                 'keywords': {
//                     'emotion': true
//                 }
//             }
//         },
//         {
//             params: {
//                 'version': '2019-07-12'
//             },
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             auth: {
//                 username: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB',
//                 password: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB'
//             }
//         }
//       )
  
//     } catch (error) {
      
//     }
    
//   }
//   fetch();
// }, []);

useEffect(() => {
  axios.get('https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522/v1/analyze}?version=2022-04-07&url=www.ibm.com&features=keywords,entities&entities.emotion=true&entities.sentiment=true&keywords.emotion=true&keywords.sentiment=true')
  .then(res => setSearch(res.data));
}, []);

const get = async () => {
  const response = await axios.get('https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522/v1/analyze}?version=2022-04-07&url=www.ibm.com&features=keywords,entities&entities.emotion=true&entities.sentiment=true&keywords.emotion=true&keywords.sentiment=true', {
    auth: {
        username: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB',
        password: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB'
    }
});
}


// const fetch = async () => {
//   const response = await axios.post(
//     'https://api.eu-de.natural-languageunderstanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522/v1/analyze?version=2019-07-12/v1/analyze',
//     {
//         'text': search,
//         'features': {
//             'sentiment': {
//                 'targets': [
//                 ]
//             },
//             'keywords': {
//                 'emotion': true
//             }
//         }
//     },
//     {
//         params: {
//             'version': '2019-07-12'
//         },
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         auth: {
//             username: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB',
//             password: 'vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB'
//         }
//     }
//   )
// } ;


  
  return (
    <div className="m-4 search">
      <div className="container-sm">
        {renderError()}
        <form className="form-inline  m-2">
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="search"
            className="form-control"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary m-2"
          >
            Go
          </button>
        </form>
        {/* <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length}/> */}
      </div>
      
      <div className="container gifs">{renderGifs()}</div>
    </div>
  );

}
export default Giphy;