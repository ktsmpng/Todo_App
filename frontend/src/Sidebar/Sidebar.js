import React from 'react';

export default class Sidebar extends React.Component{
  render(){
    return(
      <div>
        <nav>
          <ul className="navbar-nav">
            <li className="Sidebar-menu--item active">
              <i className="material-icons Sidebar-menu--itemInner">calendar_today</i>
              <button className="nav-link Sidebar-menu--itemInner h5" value="today" onClick={this.props.changeWeek}>Today</button>
            </li>
            <li className="nav-item Sidebar-menu--item">
              <i className="material-icons Sidebar-menu--itemInner">date_range</i>
              <button className="nav-link Sidebar-menu--itemInner h5" value="week" onClick={this.props.changeWeek}>This Week</button>
            </li>
          </ul>
        </nav>
      </div>
      );
  }
}