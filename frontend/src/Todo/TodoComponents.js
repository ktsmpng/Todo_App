import React, { Component } from 'react';
import axios from 'axios';

export default class TodoAppComponentListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      week: this.props.week
    };
  }

  renderNumberOfDaysTodos = ()=>{
    const daysofweek = ["Monday", "Tuesday", "Wednesday", "Thursdaay", "Friday", "Saturday", "Sunday"];
    if(this.props.week == false){
      return <TodoAppComponent week={this.props.week} day={"Today"} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>
    }else{
      return(daysofweek.map((day)=>{
        return (<TodoAppComponent week={this.props.week} day={day} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>);
      }));
    }
  }
  render(){
    return(
      <div>{this.renderNumberOfDaysTodos()}</div>
      );
  }

}

class TodoAppComponent extends React.Component{
  render(){
    return(
        <div>
          <TodoTitle day={this.props.day} />
          <TodoForm title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} week={this.props.week}/>
          <TodoList todos={this.props.todos} getTodos={this.props.getTodos}/>
        </div>
      );
  }
}

class TodoTitle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      day: 'Today',
      todaysDate: new Date()
    }
  }
  render(){
    let date = this.state.todaysDate.toUTCString();
    return(
      <div>
        <h1 className="h1">{this.state.day}</h1>
        <p>{date.slice(0,date.length - 12)}</p>
      </div>
      );
  }
}
class TodoList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      noTodo: '',
    }
  }
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

  componentDidMount(){
    this.props.week == false ? this.setState({noTodo: <div><h5>This should be false</h5></div>}): this.setState({noTodo: <div><h5>No Tasks Today</h5></div>});
  }

  render(){
    const hasTodo = this.props.todos.map(item => (
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
                    ));

    
    return(
        <div>
          {this.props.todos.length > 0 ? hasTodo : this.state.noTodo}
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
        this.clearForm();
        this.props.getTodos();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  clearForm = () =>{
    document.getElementById('formTitle').value = '';
    document.getElementById('formBody').value = '';
  }

  

  render(){
    return(
      <div className="form-group">
        <form onSubmit={this.postTodo} className="row">
          <div className="col-md-5">
            <input id="formTitle" className="form-control form-control-lg" type="text" name="title" placeholder="Title" onChange={this.props.onChange}/>
          </div>
          <div className="col-md-5">
            <input id="formBody" className="form-control form-control-lg" type="text" name="body" placeholder="Description" onChange={this.props.onChange}/>
          </div>
          <div className="col-md-2">
            <input className="btn btn-dark btn-lg" type="submit" value="Add Task" />
          </div>
        </form>
      </div>
    );
  }
}