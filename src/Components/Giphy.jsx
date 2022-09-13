import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";



const Giphy = () => {

   


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);

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