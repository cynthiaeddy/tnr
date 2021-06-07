import React from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import MostPopular from './MostPopular'
import '../stylesheets/Search.css'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      showSearchResult: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
    const val = event.target.value
    clearTimeout(this.typingTimer)
    this.typingTimer = setTimeout(() => {
      if (val) {
        this.setState({ showSearchResult: true })
      }
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.typingTimer)
  }

  render() {
    return (
      <div className='Search'>
        <nav className='Search-nav'>
          <h3>menu</h3>
          <h3 className='Search-logo'>the new republic</h3>
          <div className='Search-nav-words'>
            <h3>magazine</h3>
            <h3>subscribe</h3>
          </div>
        </nav>
        {!this.state.showSearchResult ? (
          <div className='Search-input'>
            <div className='Search-word-input'>
              <h4 className='Search-word'>Search: </h4>
              <input
                type='text'
                value={this.state.value}
                onChange={this.handleChange}
              />{' '}
            </div>
          </div>
        ) : (
          <div className='Search-input'>
            <div className='Search-word'>
              <div className='Search-word-input'>
                <h4> Your Results: </h4>
                {'  '}
                <h1>{this.state.value}</h1>
              </div>
            </div>
            <SearchResults term={this.state.value} />
          </div>
        )}
      </div>
    )
  }
}

const TitlesOnlyListContainer = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <li key={article.nid}>
          <a href={article.url}>{article.title}</a>
        </li>
      ))}
    </div>
  )
}

TitlesOnlyListContainer.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      nid: PropTypes.number,
      title: PropTypes.string,
      slug: PropTypes.string,
      publishedAt: PropTypes.string,
      url: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string,
        })
      ),
      ledeImage: PropTypes.shape({
        src: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    })
  ),
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.term !== prevProps.term ||
      this.props.limit !== prevProps.limit
    ) {
      this.fetchArticles()
    }
  }

  componentDidMount() {
    this.fetchArticles()
  }

  articleSearch(term, limit = 20, offset = 0) {
    // eslint-disable-next-line max-len
    return fetch(
      `https://newrepublic.com/api/articles?q=${term}&filters[status]=PUBLISHED&fields[0]=id&fields[1]=nid&fields[2]=slug&fields[3]=title&fields[4]=authors.name,slug&fields[6]=publishedAt&fields[7]=status&fields[8]=ledeImage&fields[9]=ledeAltImage&fields[10]=url&fields[11]=urlFull&fields[12]=sponsor&fields[13]=deck&limit=${limit}&offset=${offset}`
    )
  }

  fetchArticles() {
    this.articleSearch(this.props.term, this.props.limit).then((response) => {
      response.json().then((results) => {
        console.log(results)
        this.setState({ articles: results.data.articles })
      })
    })
  }

  render() {
    const article = this.state.articles
      .slice(0, 3)
      .map((article) => (
        <Article
          key={article.nid}
          url={article.urlFull}
          ledeImage={article.ledeImage}
          publishedAt={article.publishedAt.slice(0, 4)}
          title={article.title}
          deck={article.deck}
          author={article.authors[0]}
        />
      ))
    if (!this.state.articles.length) {
      return null
    }
    const popArticle = this.state.articles
      .slice(3)
      .map((article) => (
        <MostPopular
          key={article.nid}
          url={article.urlFull}
          ledeImage={article.ledeImage}
          title={article.title}
          author={article.authors[0]}
        />
      ))
    return (
      <>
        <div className='Articles-container'>{article}</div>
        <div className='MostPopular-container'>
          <h3>most popular</h3>
          <ul className='MostPopular-list'>{popArticle}</ul>
        </div>
        {/* <TitlesOnlyListContainer articles={this.state.articles} /> */}
      </>
    )
  }
}

SearchResults.propTypes = {
  term: PropTypes.string,
  limit: PropTypes.number,
}

export default Search
