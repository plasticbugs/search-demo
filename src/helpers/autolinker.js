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
  stripPrefix : false,
  replaceFn : function( match ) {
    console.log( "href = ", match.getAnchorHref() );
    console.log( "text = ", match.getAnchorText() );
  
    switch( match.getType() ) {
      case 'url' :
        return true;
      case 'mention' :
        return `<a href="#" class="mention">@${match.getMention()}</a>`;
      case 'hashtag' :
        return `<a href="#" class="hashtag">#${match.getHashtag()}</a>`;
    }
  }
});

export default autolinker;