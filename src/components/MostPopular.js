import React from 'react'
import '../stylesheets/MostPopular.css'

class MostPopular extends React.Component {
  render() {
    console.log(this.props.ledeImage.src)
    let imgUrl = this.props.ledeImage.src

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
