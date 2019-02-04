import React from 'react';
import axios from 'axios';

export default class TodoAppComponentListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      daysofweek: [
                    {day:"Monday", date:'', isoDate: ''}, 
                    {day:"Tuesday", date:'', isoDate: ''}, 
                    {day:"Wednesday", date:'', isoDate: ''}, 
                    {day:"Thursday", date:'', isoDate: ''}, 
                    {day:"Friday", date:'', isoDate: ''}, 
                    {day:"Saturday", date:'', isoDate: ''}, 
                    {day:"Sunday", date:'', isoDate: ''}
                  ],
      todaysDate: new Date()
    }
  }

  componentDidMount(){
    if(this.state.todaysDate.getUTCDay() !== 1){
      this.orderDaysOfWeek();
    };
  }

  orderDaysOfWeek = () =>{  
    const d = [...this.state.daysofweek];
    const td = this.state.todaysDate.getUTCDay() == 0 ? 6:this.state.todaysDate.getUTCDay();
    const orderedWeekOne = d.slice(td, d.length);
    const orderedWeekTwo = d.slice(0, td);
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
      return {day:i.day, date: tomorrow.toUTCString().slice(0,tomorrow.toUTCString().length - 12), isoDate: tomorrow.toISOString().slice(0,10)};
    });
    return newd;
  }

  renderNumberOfDaysTodos = ()=>{
    if(this.props.week === false){
      return <TodoAppComponent week={this.props.week} isoDate={this.state.daysofweek[0].isoDate} date={this.state.daysofweek[0].date} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>
    }else{
      return(this.state.daysofweek.map((d)=>{
        return (<TodoAppComponent week={this.props.week} isoDate={d.isoDate} date={d.date} day={d.day} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>);
      }));
    }
    }
  render(){
    return(

      <div>
        {this.props.week === true ? <h1>Next 7 Days</h1>: <h1>Today</h1>}
        {this.renderNumberOfDaysTodos()}
      </div>
      );
  }

}

class TodoAppComponent extends React.Component{
  render(){
    return(
        <div key={this.props.day}>
          <TodoTitle day={this.props.day} date={this.props.date} isoDate={this.props.isoDate}/>
          <TodoForm title={this.props.title} date={this.props.date} isoDate={this.props.isoDate} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} week={this.props.week}/>
          <TodoList todos={this.props.todos} isoDate={this.props.isoDate} getTodos={this.props.getTodos} week={this.props.week}/>
          <hr></hr>
        </div>
      );
  }
}

class TodoTitle extends React.Component{

  render(){
    return(
      <div>
        <h3 className="h3">{this.props.day}</h3>
        <p>{this.props.date}</p>
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
    this.props.week === false ? this.setState({noTodo: <div className="Todo-cards-complete"><h5>All tasks are complete!</h5><i className="material-icons">check_circle_outline</i></div>}): this.setState({noTodo: <div><h5>No Tasks Today</h5></div>});
  }

  render(){
    const hasTodo = this.props.todos.filter((d)=> {return d.date_due === this.props.isoDate}).map(item => (
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
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
    }
  }

  postTodo = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/', {
          title: this.props.title,
          body: this.props.body,
          date_due: this.props.isoDate
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

  showForm = () =>{
    this.state.showForm === false ? this.setState({showForm:true}): this.setState({showForm:false});
  }
  
  render(){
    const form = (<form onSubmit={this.postTodo} className="row">
                  <div className="col-md-5">
                    <input id="formTitle" className="form-control" type="text" name="title" placeholder="Title" onChange={this.props.onChange}/>
                  </div>
                  <div className="col-md-5">
                    <input id="formBody" className="form-control" type="text" name="body" placeholder="Description" onChange={this.props.onChange}/>
                  </div>
                  <div className="col-md-2">
                    <input className="btn btn-dark" type="submit" value="Add Task" />
                  </div>
                </form>);

    const addTask = (<button className="btn bg-dark text-light" onClick={this.showForm}>Add Task</button>);

    return(
      <div className="form-group">
        {this.state.showForm === true ? form: addTask}
      </div>
    );
  }
}