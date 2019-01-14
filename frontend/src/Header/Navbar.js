import React, { Component } from 'react';

export default class Navbar extends React.Component{
  render(){
    return(
      <div className="bg-danger">
        <nav class="navbar navbar-dark container">
          <a href="#"><h5 class="navbar-brand">Todo List App</h5></a>
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    );
  }
}