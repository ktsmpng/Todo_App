import React from 'react';

export default class TodoList extends React.Component{
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
          {this.props.todos.length > 0 ? hasTodo : this.props.noTodo}
        </div>
      );
  }
}