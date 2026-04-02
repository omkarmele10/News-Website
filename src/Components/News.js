import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Sppiner from "./Sppiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 1,
    category: "general",
  };
  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capatalizeToUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("inside constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      errorMessage: "",
      hasMore: true,
    };
    document.title = `${this.capatalizeToUppercase(this.props.category)} · Keep Updated`;
  }
  async updateNews() {
    this.setState({ loading: true, errorMessage: "" });
    this.props.setProgress(10);

    try {

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY1}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      // try using diff api key
      if (data.status === 429) {
        url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY2}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        data = await fetch(url);
      }
      this.props.setProgress(50);
      const parsedData = await data.json();

      if (data.status === 429) {
        this.setState({
          loading: false,
          hasMore: false,
          errorMessage: "Free API limit reached for today. Please try again after 24 hours."
        });
        this.props.setProgress(100);
        return;
      }

      if (!data.ok) {
        this.setState({
          loading: false,
          hasMore: false,
          errorMessage: parsedData.message || "Something went wrong while loading the news."
        });
        this.props.setProgress(100);
        return;
      }

      this.setState((prevState) => {
        const mergedArticles = prevState.articles.concat(parsedData.articles || []);
        const nextArticles = mergedArticles.filter((article, index, self) => {
          if (!article.url) {
            return true;
          }

          return index === self.findIndex((item) => item.url === article.url);
        });
        const totalResults = parsedData.totalResults || 0;

        return {
          articles: nextArticles,
          totalResults,
          loading: false,
          hasMore: nextArticles.length < totalResults,
        };
      });
      this.props.setProgress(100);
    } catch (error) {
      this.setState({
        loading: false,
        hasMore: false,
        errorMessage: "Unable to load news right now. Please check your connection and try again."
      });
      this.props.setProgress(100);
    }
  }
  fetchMoreData = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  }
  // pageSize = no of article/post in 1 page
  async componentDidMount() {
    console.log("inside component did mount");
    this.updateNews();
  }
  handlePreviousClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  };
  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  };
  render() {
    return (
      <div className="container pt-5">
        <h2 className="text-center">Top Headlines </h2>
        {this.state.errorMessage && (
          <div className="alert alert-warning my-3" role="alert">
            {this.state.errorMessage}
          </div>
        )}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          // render loading gif img 
          loader={this.state.loading && <Sppiner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((i, index) => {
                return (
                  <div className="col-md-4" key={i.url || `${i.title}-${index}`}>
                    <NewsItem
                      title={i.title ? i.title.slice(0, 40) : ""}
                      description={i.description ? i.description.slice(0, 80) : ""}
                      imageUrl={
                        i.urlToImage
                          ? i.urlToImage
                          : "https://img.freepik.com/free-vector/global-broadcast-breaking-news-banner-with-global-map_1017-59836.jpg?semt=ais_hybrid&w=740&q=80"
                      }
                      newsUrl={i.url}
                      author={i.author ? i.author.slice(0, 25) : ""}
                      date={i.publishedAt}
                      source={i.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div >
    );
  }
}

export default News;
