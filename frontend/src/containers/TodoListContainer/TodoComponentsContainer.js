import React from 'react';
import axios from 'axios';
import TodoComponent from '../../components/TodoList/TodoComponent';

export default class TodoComponentsContainer extends React.Component{
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
      return <TodoComponent week={this.props.week} isoDate={this.state.daysofweek[0].isoDate} date={this.state.daysofweek[0].date} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>
    }else{
      return(this.state.daysofweek.map((d)=>{
        return (<TodoComponent week={this.props.week} isoDate={d.isoDate} date={d.date} day={d.day} title={this.props.title} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} todos={this.props.todos}/>);
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