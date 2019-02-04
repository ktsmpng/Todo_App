import React from 'react';

export default class TodoTitle extends React.Component{
  render(){
    return(
      <div>
        <h3 className="h3">{this.props.day}</h3>
        <p>{this.props.date}</p>
      </div>
      );
  }
}