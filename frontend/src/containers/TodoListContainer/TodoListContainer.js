import React from 'react';
import axios from 'axios';
import TodoList from '../../components/TodoList/TodoList';

export default class TodoListContainer extends React.Component{
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
        this.props.getTodos();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount(){
    alert(this.props.todos.length);
    this.props.week === false ? this.setState({noTodo: <div className="Todo-cards-complete"><h5>All tasks are complete!</h5><i className="material-icons">check_circle_outline</i></div>}): this.setState({noTodo: <div><h5>No Tasks Today</h5></div>});
  }

  render(){
    return(
        <TodoList todos={this.props.todos} deleteTodo={this.deleteTodo} noTodo={this.state.noTodo} />
      );
  }
}