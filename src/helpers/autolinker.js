const Autolinker = require('autolinker');

let autolinker = new Autolinker({
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
});

export default autolinker;