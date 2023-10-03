import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <span class="position-absolute translate-middle badge rounded-pill bg-danger" style={{ left: "85%", zIndex: "1", top: "0px" }}>{source}</span>
          <img src={!imgUrl ? "https://timesofindia.indiatimes.com/photo/msid-103676807,imgsize-58212.cms" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text" ><small className="text-body-secondary text-danger" >By {!author ? "Unknown" : author} On {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
