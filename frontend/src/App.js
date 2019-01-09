import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      title: '',
      body: '',
      todaysDate: new Date()
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
      <div className="bg-light">
        <Navbar />
        <div className="App container">
          <div className="row">
            <div className="col-md-4 bg-light App-container--inner">
              <navbar>
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <h5><a className="nav-link text-black" href="#">Today</a></h5>
                  </li>
                  <li class="nav-item">
                    <h5><a className="nav-link" href="#">This Week</a></h5>
                  </li>
                </ul>
              </navbar>
            </div>
            <div className="col-md-8 bg-white App-container--inner">
              <span>
                <h1 className="h1">Today</h1>
                <p>{this.state.todaysDate.toUTCString()}</p>
              </span>
              
              <TodoForm title={this.state.title} body={this.state.body} onChange={this.onChange} getTodos={this.getTodos}/>
              <TodoList todos={this.state.todos} getTodos={this.getTodos}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Navbar extends React.Component{
  render(){
    return(
      <div className="bg-danger">
        <nav class="navbar navbar-dark container">
          <a href="#"><h5 class="navbar-brand">Todo List App</h5></a>
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    );
  }
}

class TodoList extends React.Component{
  deleteTodo = (e) =>{
    let address = 'http://127.0.0.1:8000/api/' + e.target.value + "/";
    axios
      .delete(address, {
          id: e.target.value,
      })
      .then(res => {
        setTimeout(function() {}, 80000);
        this.props.getTodos();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return(
        <div>
          {this.props.todos.map(item => (
            <div className="card bg-outline-info text-dark Todo-cards" key={item.id}>
              <div className="row">
                <div className="Todo-cards--checkbox-container col-md-1">
                  <input className="Todo-cards--checkbox" type="checkbox" onClick={this.deleteTodo} value={item.id}/>
                </div>
                <div className="col-md-11 card-body"> 
                  <h5>{item.title}</h5>
                  <p>{item.body}</p>
                </div>
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
        this.props.getTodos();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    return(
      <div className="form-group">
        <form onSubmit={this.postTodo} className="row">
          <div className="col-md-5">
            <input className="form-control form-control-lg" type="text" name="title" placeholder="Title" onChange={this.props.onChange}/>
          </div>
          <div className="col-md-5">
            <input className="form-control form-control-lg" type="text" name="body" placeholder="Description" onChange={this.props.onChange}/>
          </div>
          <div className="col-md-2">
            <input className="btn btn-dark btn-lg" type="submit" value="Add Task" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
