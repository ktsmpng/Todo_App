import React from 'react';
import TodoFormContainer from '../../containers/TodoListContainer/TodoFormContainer';
import TodoListContainer from '../../containers/TodoListContainer/TodoListContainer';
import TodoTitle from './TodoTitle';

export default class TodoComponent extends React.Component{
  render(){
    return(
        <div key={this.props.day}>
          <TodoTitle day={this.props.day} date={this.props.date} isoDate={this.props.isoDate}/>
          <TodoFormContainer title={this.props.title} date={this.props.date} isoDate={this.props.isoDate} body={this.props.body} onChange={this.props.onChange} getTodos={this.props.getTodos} week={this.props.week}/>
          <TodoListContainer todos={this.props.todos} isoDate={this.props.isoDate} getTodos={this.props.getTodos} week={this.props.week}/>
          <hr></hr>
        </div>
      );
  }
}