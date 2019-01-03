import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
    {
        "id": 1,
        "title": "Learn HTTP",
        "body": "Learning HTTP requests GET and Post"
    },
    {
        "id": 2,
        "title": "Make React Frontend",
        "body": "Connecting to API"
    }
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.list.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
          ))}
      </div>
    );
  }
}

export default App;
