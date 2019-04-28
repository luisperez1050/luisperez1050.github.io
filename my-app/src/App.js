import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This looks pretty cool</p>
        <button>Switch Name</button>
        <Person name='Luis' age='29'/>
        <Person name='Sadie' age='29'/>
        <Person name='Celkay' age='6'> I love you girls very much!</Person>
      </div>
    );
  }
}

export default App;
