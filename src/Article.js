import React from 'react'
import './Article.css'

class Article extends React.Component {
  render() {
    let imgUrl
    const images = this.props.ledeImage
    for (let img in images) {
      if (img === 'src') {
        imgUrl = images[img]
      }
    }

    return (
      <div className='Article'>
        <a href={this.props.url}>
          <div className='Article-img-container'>
            <img src={imgUrl} className='Article-img' alt='' />
          </div>
          <h3>{this.props.publishedAt}</h3>
          <h1 className='Article-title'>{this.props.title}</h1>
          <h1 className='Article-deck'>{this.props.deck}</h1>
          <h3 className='Article-author'>{this.props.author.name}</h3>
        </a>
      </div>
    )
  }
}
export default Article
