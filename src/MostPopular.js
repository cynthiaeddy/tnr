import React from 'react'
import './MostPopular.css'

class MostPopular extends React.Component {
  render() {
    let imgUrl
    const images = this.props.ledeImage
    for (let img in images) {
      if (img === 'src') {
        imgUrl = images[img]
      }
    }

    return (
      <li>
        <a href={this.props.url}>
          <span>
            <img src={imgUrl} className='MostPopular-img' alt='' />
          </span>{' '}
          <h1>
            {this.props.title}

            <span>
              <h3>{this.props.author.name}</h3>
            </span>
          </h1>
        </a>
      </li>
    )
  }
}

export default MostPopular
