import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  articles = [];
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  Capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  constructor(props) {
    super(props);
  
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    };
    document.title = `${this.Capitalize(this.props.category)} - Columns`;
  }

  async updateNews() {
    this.props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    await this.updateNews();
  }
  
  
  fetchMoreData = async () => {
   this.setState({
    page:this.state.page+1,
   }) 
   const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "35px 0px" , marginTop:"90px"}}>
            Top {this.Capitalize(this.props.category)} Headlines
          </h1>
          {this.state.loading && <Spinner></Spinner>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
          <div className="container">
          <div className="row">
            {
              this.state.articles?.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 65) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 65)
                          : "Continue Reading"
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://images.moneycontrol.com/static-mcnews/2022/08/funding1-1.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    ></NewsItem>
                  </div>
                );
              })}
          </div></div>
          </InfiniteScroll>
          
        </div>
      </>
    );
  }
}
// 3d06113a5ce64b66b5f2169091e81173
