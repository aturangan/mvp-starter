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

        //want to render this data to the page
        console.log(data);  
        console.log('Successful AJAX Request');
      },

      error: (err) => {
        console.log('Error');
      }

    });
  }

  // componentDidMount() {

  //   $.ajax({
  //     url: 'http://localhost:3000/info', 
  //     type: 'GET', 

  //     success: (data) => {
  //       console.log('DATA', data); 
  //       console.log('Successful GET Request');

  //       //check state
  //       // this.setState({
  //       //   SW: data
  //       // })
  //     },

  //     error: (err) => {
  //       console.log('err', err); 
  //     }
  //   })
  // }

  render () {
    return (<div>
      <h1>Star Wars Information</h1>
      <ListInfo info={this.state.info}/>
      <Search onSearch={this.search.bind(this)}/>
      <div>{this.state.name}</div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));