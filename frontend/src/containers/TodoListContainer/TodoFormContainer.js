import TodoForm from '../../components/TodoList/TodoForm';
import React from 'react';
import axios from 'axios';

 export default class TodoFormContainer extends React.Component{
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
        alert(this.props.todos.length);
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
    return(
      <TodoForm showForm={this.showForm} clearForm={this.clearForm} postTodo={this.postTodo} showFormValue={this.state.showForm} onChange={this.props.onChange}/>
      );
  }
}