import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  state = {
    persons: [
      { name: 'Luis', age: 29 },
      { name: 'Sadie', age: 29 },
      { name: 'Celkay', age: 6 }
    ]
  }

  switchNameHandler = () => {
    this.setState( {
       persons: [
        { name: 'Perez', age: 9 },
        { name: 'Perez', age: 10 },
        { name: 'Perez', age: 60 }
       ]
      } )
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This looks pretty cool</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}> I love you girls very much!</Person>
      </div>
    );
  }
}

export default App;
