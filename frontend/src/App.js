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
      <div className="App container container-fluid jumbotron">
        <div className="">
            <h1 className="h1">Todo App</h1>
        </div>
        <TodoForm title={this.state.title} body={this.state.body} onChange={this.onChange} getTodos={this.getTodos}/>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

class TodoList extends React.Component{
  render(){
    return(
        <div>
          {this.props.todos.map(item => (
            <div className="card bg-light text-dark" key={item.id}>
              <div className="card-body"> 
              <h5>{item.title}</h5>
              <p>{item.body}</p>
              </div>
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
      <div className="form-group row">
        <form onSubmit={this.postTodo} className="row">
          <div className="col-md-4">
            <input type="text" name="title" placeholder="Title" onChange={this.props.onChange}/>
          </div>
          <div className="col-md-4">
            <input type="text" name="body" placeholder="Description" onChange={this.props.onChange}/>
          </div>
          <div className="col-md-4">
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
