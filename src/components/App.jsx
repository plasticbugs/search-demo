import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Tweet from './Tweet.jsx';
import Search from './Search.jsx';
import 'normalize.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loading: false,
      recentSearch: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    this.setState({loading: true});
    axios.get('/api/search', {
      params: {
        q: query
      }
    })
    .catch( err => {
      this.setState({loading: false, recentSearch: ''});
      console.log('Error retrieving search results.')
    })
    .then( result => {
      console.log(result.data)
      this.setState( { searchResults: result.data, loading: false, recentSearch: query } );
    })
  }

  render() {
    let results;
    if(this.state.loading) {
      results = <div className="lds-css ng-scope">
<div className="lds-spin"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>;
    } else {
      results = (
        <div className="tweet-list">
          <ul>
            { this.state.searchResults.map( tweet => {
              console.log(tweet);
              return (
                < Tweet
                  user_id={ tweet.user_id }
                  text={ tweet.text }
                  date={ tweet.formatted_date }
                  handleSearch={ this.handleSearch }
                  key={ tweet._id }
                />);
              })
            }
          </ul>
        </div>);
    }
    return (<div id="container">
      < Search handleSearch={ this.handleSearch } recentSearch={this.state.recentSearch} />
      { results }
    </div>);
  }
}

module.exports = App;

ReactDOM.render(
  < App />,
  document.getElementById('root')
);