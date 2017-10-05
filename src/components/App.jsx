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
      loading: false
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
      this.setState({loading: false});
      console.log('Error retrieving search results.')
    })
    .then( result => {
      console.log(result.data)
      this.setState( { searchResults: result.data, loading: false } );
    })
  }

  render() {
    let results;
    if(this.state.loading) {
      results = <div>Loading...</div>;
    } else {
      results = (<ul>
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
        </ul>);
    }
    return (<div>
      < Search handleSearch={ this.handleSearch } />
      { results }
    </div>);
  }
}

module.exports = App;

ReactDOM.render(
  < App />,
  document.getElementById('root')
);