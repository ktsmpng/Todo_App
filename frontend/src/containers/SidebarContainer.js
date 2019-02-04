import React from 'react';
import Sidebar from '../components/Sidebar';

export default class SidebarContainer extends React.Component{
	render(){
		return(
			<Sidebar changeWeek={this.props.changeWeek}/>
		);	
	}
}