import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      title: '',
      body: ''
    };
  }

  componentDidMount(){
    this.getTodos();
  }

  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  getTodos = () =>{
    axios
      .get('http://127.0.0.1:8000/api/')
      .then(res => {
        this.setState({ todos:res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm title={this.state.title} body={this.state.body} onChange={this.onChange} getTodos={this.getTodos}/>
        {this.state.todos.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
          ))}
      </div>
    );
  }

}

class TodoForm extends App{

  postTodo = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/', {
          title: this.props.title,
          body: this.props.body
      })
      .then(res => {
        alert('sent');
        this.props.getTodos();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    return(
      <form onSubmit={this.postTodo}>
          <input type="text" name="title" placeholder="Title" onChange={this.props.onChange}/>
          <input type="text" name="body" placeholder="Description" onChange={this.props.onChange}/>
          <input type="submit" value="submit" />
      </form>
    );
  }
}

export default App;
