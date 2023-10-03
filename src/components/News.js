import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  // articles = [

  //   {
  //     "source": { "id": "bbc-sport", "name": "BBC Sport" },
  //     "author": null,
  //     "title": "Cricket Australia makes neck protectors compulsory",
  //     "description": "Cricket Australia brings in new rules which will require batters to wear neck protectors on their helmets when facing fast or medium bowling.",
  //     "url": "http://www.bbc.co.uk/sport/cricket/66805723",
  //     "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/E89C/production/_131084595_gettyimages-1171931485.jpg",
  //     "publishedAt": "2023-09-14T07:37:20.4176247Z",
  //     "content": "Australia batter Steve Smith says neck protectors make him feel \"claustrophobic'\r\nCricket Australia has made it mandatory for batters to wear neck protectors on their helmets when facing fast or medi… [+1505 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-sport", "name": "BBC Sport" },
  //     "author": null,
  //     "title": "'Stokes tees off to put rest of world on notice'",
  //     "description": "Ben Stokes was due to be playing golf at the PGA Championship this week, instead he teed off against New Zealand and put the rest of the world on notice, says chief cricket writer Stephan Shemilt.",
  //     "url": "http://www.bbc.co.uk/sport/cricket/66804577",
  //     "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/57A6/production/_131083422_benstokes.jpg",
  //     "publishedAt": "2023-09-13T23:22:20.4986499Z",
  //     "content": "In another world, Ben Stokes was due to be playing golf this week.\r\nWhen he was still a former member of England's one-day team, Stokes was scheduled to be part of the BMW PGA Championship at Wentwor… [+4637 chars]"
  //   },
  //   {
  //     "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      load: false,
      page: 1
    }
    document.title = `${this.props.category} - NewsMonkey`
  }


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8eb6c982586d432085d9c6b100766c67&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ load: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      load: false
    })
  }



  handlePrevclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8eb6c982586d432085d9c6b100766c67&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ load: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      load: false
    })
  }


  handleNextclick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8eb6c982586d432085d9c6b100766c67&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ load: true })
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        load: false
      })
    }
  }



  render() {
    console.log("render")
    return (
      <div className='container my-3' >
        <h1 className='text-center' style={{ margin: "25px 0px" }}>News Monkey - Top {this.props.category} Headline</h1>
        {this.state.load && <Spinner />}
        <div className="row">

          {this.state.articles.map((element) => {
            return (
              <div className='col-md-3 mx-3' key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 65) : ""}
                  imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                  source={element.source.name} />
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark"
            onClick={this.handlePrevclick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
export default News
