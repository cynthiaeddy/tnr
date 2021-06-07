import React from 'react'
import '../stylesheets/Article.css'

class Article extends React.Component {
  render() {
    let imgUrl = this.props.ledeImage.src

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
