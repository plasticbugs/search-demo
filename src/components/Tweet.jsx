import React from 'react';
const Autolinker = require('autolinker');
var Parser = require('html-react-parser');

var autolinker = new Autolinker({
  urls : {
      schemeMatches : true,
      wwwMatches    : true,
      tldMatches    : true
    },
  email       : false,
  phone       : false,
  mention     : 'twitter',
  hashtag     : 'twitter',
  replaceFn : function( match ) {
    console.log( "href = ", match.getAnchorHref() );
    console.log( "text = ", match.getAnchorText() );
  
    switch( match.getType() ) {
      case 'url' :
        console.log( "url: ", match.getUrl() );
        return true;
      case 'mention' :
        console.log( "Mention: ", match.getMention() );
        console.log( "Mention Service Name: ", match.getServiceName() );
        return `<a href="#" class="mention" onClick=${this.handleMentionClick}>@${match.getMention()}</a>`;
      case 'hashtag' :
        return `<a href="#" class="hashtag" onClick=${this.handleHashtagClick}>#${match.getHashtag()}</a>`;
    }
  }
})

// /api/search?q=@${match.getMention()}
// /api/search?q=#${match.getHashtag()}

// var linkedText = Autolinker.link( input, {
//   replaceFn : function( match ) {
//     console.log( "href = ", match.getAnchorHref() );
//     console.log( "text = ", match.getAnchorText() );

//     switch( match.getType() ) {
//       case 'url' :
//         console.log( "url: ", match.getUrl() );
//         return true;
//       case 'mention' :
//         return '<a href="/api/search?q=@">' + match.getMention() + '</a>';
//       case 'hashtag' :
//         return '<a href="/api/search?q=#">' + match.getHashtag() + '</a>';
//     }
//   }
// });
      

class Tweet extends React.Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleClick(e) {
    if(e.target.className === 'mention' || e.target.className === 'hashtag') {
      e.preventDefault();
      this.handleSearchClick(e.target.innerText);
    }
    // if(e.target.href && e.target.href.length === 1) {
    //   e.preventDefault();
    //   console.log(e.target);
    // } 
  }
  handleSearchClick(query) {
    console.log(query);
    this.props.handleSearch(query);
  }

  render(){
    let linkedText = autolinker.link( this.props.text);
    return (
      <li>
        <div className="content">
          <div className="tweet-info">
            <span className="user-id">{ this.props.user_id}</span> <span className="mid-dot">·</span> <span className="post-date">{this.props.date}</span>
          </div>
          <div className="tweet-text" onClick={ this.handleClick }>
            { Parser(linkedText) }
          </div>
        </div>
        <h2></h2>
      </li>
    )
  }
}

export default Tweet;