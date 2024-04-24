import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const { country, category, pageSize, mode, setProgress, search } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=54e190b1711146228a6ea850e8110958&page=1&pageSize=${pageSize}`;
    setLoading(true);
    setProgress(30);
    try {
      let data = await fetchWithRetry(url);
      setProgress(60);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=54e190b1711146228a6ea850e8110958&page=${nextPage}&pageSize=${pageSize}`;
    if (search) {
      url += `&q=${encodeURIComponent(search)}`;
    }
    setLoading(true);
    try {
      let data = await fetchWithRetry(url);
      let parsedData = await data.json();
      if (search) {
        setTotalResults(parsedData.totalResults);
        if (parsedData.articles.length === 0) {
          setLoading(false);
          return;
        }
      } else {
        setTotalResults(totalResults + parsedData.articles.length);
        if (parsedData.articles.length === 0) {
          setLoading(false);
          return;
        }
      }
      setArticles([...articles, ...parsedData.articles]);
      setLoading(false);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setError("Error fetching more data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      let data = await fetch(url);
      if (data.status === 429 && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, retries - 1, delay * 2);
      }
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      return data;
    } catch (error) {
      throw new Error("Error fetching data. Please try again later.");
    }
  };

  return (
    <div
      className={`container my-3 text-${
        mode === "primary" ? "black" : "white"
      }`}
    >
      <h2 className="text-center" style={{ margin: "30px", marginTop: "90px" }}>
        NewsMonkey-Top {capitalizeFirstLetter(category)} Headlines
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles
              .filter((element) => {
                const title = element.title || "";
                const searchLowerCase = search ? search.toLowerCase() : "";
                return (
                  !searchLowerCase ||
                  title.toLowerCase().includes(searchLowerCase)
                );
              })
              .map((element, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    mode={mode}
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    ImageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://pics.craiyon.com/2023-06-20/7f9a15a54868484cb758093340ddb0e1.webp"
                    }
                    NewsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
      {!loading&& <h1 className="justify-center">No more matching news found.</h1>}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  mode: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
