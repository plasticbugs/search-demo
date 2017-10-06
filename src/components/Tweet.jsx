import React from 'react';
const Parser = require('html-react-parser');
import autolinker from '../helpers/autolinker';

class Tweet extends React.Component {
  constructor( props ) {
    super( props );
    this.handleUrlClick = this.handleUrlClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleUrlClick(e) {
    if(e.target.className === 'mention' || e.target.className === 'hashtag') {
      e.preventDefault();
      this.handleSearchClick(e.target.innerText);
    }
  }
  handleSearchClick(query) {
    this.props.handleSearch(query);
  }

  render(){
    let linkedText = autolinker.link( this.props.text);
    return (
      <li>
        <div className="content">
          <div className="tweet-info">
            <span className="user-id">{ '@' + this.props.user_id}</span> <span className="mid-dot">·</span> <span className="post-date">{this.props.date}</span>
          </div>
          <div className="tweet-text" onClick={ this.handleUrlClick }>
            { Parser(linkedText) }
          </div>
        </div>
        <h2></h2>
      </li>
    )
  }
}

export default Tweet;