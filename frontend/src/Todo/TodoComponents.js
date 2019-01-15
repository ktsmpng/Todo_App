import React, { Component } from 'react';
import axios from 'axios';

export default class TodoAppComponentListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      daysofweek: [{day:"Monday", date:''}, 
      {day:"Tuesday",date:''}, {day:"Wednesday",date:''}, {day:"Thursday",date:''}, {day:"Friday",date:''}, {day:"Saturday",date:''}, {day:"Sunday",date:''}],
      todaysDate: new Date()
    }
  }

  componentDidMount(){
    if(this.state.todaysDate.getUTCDay() != 1){
      this.orderDaysOfWeek();
    };
  }

  orderDaysOfWeek = () =>{  
    const d = [...this.state.daysofweek];
    const orderedWeekOne = d.slice(this.state.todaysDate.getUTCDay() -1, d.length);
    const orderedWeekTwo = d.slice(0, this.state.todaysDate.getUTCDay());
    const final = this.mapDates(orderedWeekOne.concat(orderedWeekTwo));
    this.setState({daysofweek: final});
  }

  mapDates = (array) =>{
    const d = [...array];
    let count = 0;
    const newd = d.map((i)=>{
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + count); 
      count+=1;
      return {day:i.day, date: tomorrow.toUTCString().slice(0,today.toUTCString().length - 12)};
    });
    return newd;
  }

  renderNumberOfDaysTodos = ()=>{
    if(this.props.week == false){
      return <TodoAppComponent week={this.props.week} date={this.state.daysofweek[0].date} day={"Today"} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>
    }else{
      return(this.state.daysofweek.map((d)=>{
        return (<TodoAppComponent week={this.props.week} date={d.date} day={d.day} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>);
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
          <TodoTitle day={this.props.day} date={this.props.date}/>
          <TodoForm title={this.props.title} date={this.props.date} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} week={this.props.week}/>
          <TodoList todos={this.props.todos} getTodos={this.props.getTodos} week={this.props.week}/>
          <hr></hr>
        </div>
      );
  }
}

class TodoTitle extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1 className="h1">{this.props.day}</h1>
        {this.props.date}
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
    this.props.week == false ? this.setState({noTodo: <div className="Todo-cards-complete"><h5>All tasks are complete!</h5><i className="material-icons">check_circle_outline</i></div>}): this.setState({noTodo: <div><h5>No Tasks Today</h5></div>});
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
          body: this.props.body,
          date_created: this.props.date
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