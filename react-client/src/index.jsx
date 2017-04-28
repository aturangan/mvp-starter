import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ListInfo from './components/ListInfo.jsx';
// import List from './components/List.jsx';


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

        console.log('successful ajax request');
      },

      error: (err) => {
        console.log('err', err);
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
      <h1>List Stats</h1>
      <ListInfo info={this.state.SW}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));