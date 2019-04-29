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
	};
	
	switchNameHandler = (newName) => {
		this.setState({
			persons: [
				{ name: newName, age: 9 },
				{ name: 'Perez', age: 10 },
				{ name: 'Perez', age: 60 }
			]
		});
	};
	
	nameChangeHandler = (event) => {
		this.setState( {
			persons: [
				{ name: event.target.value, age: 35 },
				{ name: 'Saide Perez', age: 29 },
				{ name: 'Celkay Perez', age: 6 }
			]
		})
	}
	
	render() {
		return (
		<div className="App">
			<h1>Hi, I'm a React App</h1>
			<p>This looks pretty cool</p>
			<button onClick={() => this.switchNameHandler('Luis Angel!!!!!')}>Switch Name</button>
			<Person 
				name={this.state.persons[0].name}
				age={this.state.persons[0].age}
				click={this.switchNameHandler.bind(this, 'Perez Family')}
				change={this.nameChangeHandler}
			/>
			<Person 
				name={this.state.persons[1].name}
				age={this.state.persons[1].age}
			/>
			<Person 
				name={this.state.persons[2].name}
				age={this.state.persons[2].age} 
			>
				I love you girls very much!
			</Person>
		</div>
		);
	}
}

export default App;
