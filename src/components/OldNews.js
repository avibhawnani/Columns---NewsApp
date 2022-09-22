import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
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
    // console.log("I am a News.js");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.Capitalize(this.props.category)} - Columns`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=3d06113a5ce64b66b5f2169091e81173&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    // console.log("Hello CDM");
    // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=3d06113a5ce64b66b5f2169091e81173&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false});
    await this.updateNews();
  }
  handleNext = async () => {
    // if(!(this.state.page + 1  > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // this.setState({loading:true});
    // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=3d06113a5ce64b66b5f2169091e81173&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page+1,
    //   articles:parsedData.articles,
    //   loading:false
    // })}
    // console.log(parsedData.articles.length);
    // console.log(parsedData.articles)
    this.setState({ page: this.state.page + 1 });
    await this.updateNews();
  };
  handlePrevious = async () => {
    // console.log("Hello prev")
    // this.setState({loading:true});
    // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=3d06113a5ce64b66b5f2169091e81173&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    await this.updateNews();
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            Top {this.Capitalize(this.props.category)} Headlines
          </h1>
          {this.state.loading && <Spinner></Spinner>}
          <div className="row">
            {!this.state.loading &&
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
          </div>
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-dark my-1 mx-1"
              onClick={this.handlePrevious}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-dark my-1 mx-1"
              onClick={this.handleNext}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
// 3d06113a5ce64b66b5f2169091e81173
