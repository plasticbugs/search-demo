import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearchClick() {
    this.props.handleSearch(this.state.query);
    this.setState({query: ''});
  }

  handleInputChange(event) {
    this.setState({query: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearchClick();
    }
  }
  
  render() {
    return (
      <div>
        <input 
          className="search-field"
          value={ this.state.query }
          placeholder="Search tweets"
          onChange={ this.handleInputChange }
          onKeyPress={ this.handleKeyPress }
        >
        </input>
        <input 
          type="button" 
          value="submit"
          className="submit-button"
          onClick={ this.handleSearchClick } 
        />
      </div>
    )
  }
}

export default Search;