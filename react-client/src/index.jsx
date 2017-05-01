import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import ListInfo from './components/ListInfo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      info: [],
      name: ''
    }
  }

  search(word) {
    console.log(`${word} was searched`);

    $.ajax({

      url: 'http://localhost:3000/SW',
      type: 'POST', 
      data: JSON.stringify({'word': `${word}`}),
      contentType: 'application/json',

      success: (data) => {

        this.setState({
          name: data
        });

        console.log(data);  
        console.log('Successful AJAX Request');
      },

      error: (err) => {
        console.log('Error');
      }

    });
  }

  render () {
    return (<div id="text">
      <h1 id="text" id="logo">Star Wars Information</h1>
      <ListInfo info={this.state.info}/>
      <Search onSearch={this.search.bind(this)}/>
      <div id="result">{this.state.name}</div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));