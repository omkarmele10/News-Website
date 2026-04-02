import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Sppiner from "./Sppiner";

const News = ({
  country = "in",
  pageSize = 1,
  category = "general",
  setProgress = () => { },
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const capitalizeToUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = useCallback(
    async (pageToLoad = 1, reset = false) => {
      setLoading(true);
      setErrorMessage("");
      setProgress(10);

      try {
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY1}&page=${pageToLoad}&pageSize=${pageSize}`;
        let data = await fetch(url);

        if (data.status === 429) {
          url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY2}&page=${pageToLoad}&pageSize=${pageSize}`;
          data = await fetch(url);
        }

        setProgress(50);
        const parsedData = await data.json();

        if (data.status === 429) {
          setLoading(false);
          setHasMore(false);
          setErrorMessage(
            "Free API limit reached for today. Please try again after 24 hours."
          );
          setProgress(100);
          return;
        }

        if (!data.ok) {
          setLoading(false);
          setHasMore(false);
          setErrorMessage(
            parsedData.message || "Something went wrong while loading the news."
          );
          setProgress(100);
          return;
        }

        const incomingArticles = parsedData.articles || [];
        const nextTotalResults = parsedData.totalResults || 0;

        setArticles((prev) => {
          const base = reset ? [] : prev;
          const merged = base.concat(incomingArticles);

          return merged.filter((article, index, self) => {
            if (!article.url) {
              return true;
            }
            return index === self.findIndex((item) => item.url === article.url);
          });
        });

        setTotalResults(nextTotalResults);
        setHasMore(pageToLoad * pageSize < nextTotalResults);
        setLoading(false);
        setProgress(100);
      } catch (error) {
        setLoading(false);
        setHasMore(false);
        setErrorMessage(
          "Unable to load news right now. Please check your connection and try again."
        );
        setProgress(100);
      }
    },
    [country, category, pageSize, setProgress]
  );

  useEffect(() => {
    document.title = `${capitalizeToUppercase(category)} · Keep Updated`;
  }, [category]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    updateNews(1, true);
  }, [country, category, pageSize, updateNews]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await updateNews(nextPage, false);
  };

  return (
    <div className="container pt-5">
      <h2 className="text-center">Top Headlines ({totalResults})</h2>

      {errorMessage && (
        <div className="alert alert-warning my-3" role="alert">
          {errorMessage}
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={loading && <Sppiner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((item, index) => (
              <div className="col-sm-6 col-lg-4" key={item.url || `${item.title}-${index}`}>
                <NewsItem
                  title={item.title ? item.title.slice(0, 40) : ""}
                  description={item.description ? item.description.slice(0, 80) : ""}
                  imageUrl={
                    item.urlToImage
                      ? item.urlToImage
                      : "https://img.freepik.com/free-vector/global-broadcast-breaking-news-banner-with-global-map_1017-59836.jpg?semt=ais_hybrid&w=740&q=80"
                  }
                  newsUrl={item.url}
                  author={item.author ? item.author.slice(0, 25) : ""}
                  date={item.publishedAt}
                  source={item.source?.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
