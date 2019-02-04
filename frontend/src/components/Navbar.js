import React from 'react';

export default class Navbar extends React.Component{
	render(){
		return(
			<div className="bg-danger">
				<nav className="navbar navbar-dark container">
		          <a href="#"><h5 className="navbar-brand">Todo List App</h5></a>
		          <form className="form-inline">
		            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
		            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
		          </form>
		        </nav>
	        </div>
	    );
	}
}