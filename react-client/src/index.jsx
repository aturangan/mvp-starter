import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import ListInfo from './components/ListInfo.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      info: []
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

        //check state
        this.setState({
          SW: data
        });

        console.log('Successful AJAX Request');
      },

      error: (err) => {
        console.log('Error');
      }

    });
  }

  componentDidMount() {

    $.ajax({
      url: 'http://localhost:3000/info', 
      type: 'GET', 

      success: (data) => {
        console.log('ajax success in component');

        //check state
        this.setState({
          SW: data
        })
      },

      error: (err) => {
        console.log('err', err); 
      }
    })
  }

  render () {
    return (<div>
      <h1>Star Wars Information</h1>
      <ListInfo info={this.state.info}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));