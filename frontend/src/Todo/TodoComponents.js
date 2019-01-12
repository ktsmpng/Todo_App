import React, { Component } from 'react';

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

class TodoForm extends React.Component{
  
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