import React from 'react';

export default class TodoForm extends React.Component{ 
  render(){
    const form = (<form onSubmit={this.props.postTodo} className="row">
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

    const addTask = (<button className="btn bg-dark text-light" onClick={this.props.showForm}>Add Task</button>);

    return(
      <div className="form-group">
        {this.props.showFormValue === true ? form: addTask}
      </div>
    );
  }
}