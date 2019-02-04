import React from 'react';
import TodoComponentsContainer from './containers/TodoListContainer/TodoComponentsContainer';
// import Sidebar from './Sidebar/Sidebar';
// import Navbar from './Header/Navbar'
import axios from 'axios';
import NavbarContainer from './containers/NavbarContainer';
import SidebarContainer from './containers/SidebarContainer';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      todos:[],
      title: '',
      body: '',
      week: false
    };
  }

  changeWeek = (e)=>{
    e.target.value === "today" ? this.setState({week:false}): this.setState({week: true});
  }

  componentDidMount(){
    this.getTodos();
  }

  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }

  getTodos = () =>{
    axios
      .get('http://127.0.0.1:8000/api/')
      .then(res => {
        this.setState({ todos:res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  

  render(){
    return (
      <div className="bg-light">
        <NavbarContainer />
        <div className="App container">
          <div className="row">
            <div className="col-md-4 bg-light App-container--inner">
              <SidebarContainer changeWeek={this.changeWeek}/>
            </div>
            <div className="col-md-8 bg-white App-container--inner">
              <TodoComponentsContainer onChange={this.onChange} getTodos={this.getTodos} week={this.state.week} todos={this.state.todos} title={this.state.title} body={this.state.body}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
