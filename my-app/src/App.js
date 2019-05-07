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
			],
			otherState: 'some other value',
			showPerson: false
		});
	};
	
	nameChangeHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});
		
		const person = {
			...this.state.persons[personIndex]
		};
		
		person.name = event.target.value;
		const persons = [...this.state.persons];
		persons[personIndex] = person;
		
		this.setState( { persons: persons } )
	}
	
	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}
	
	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({showPersons: !doesShow});
	}
	
	render() {
		
		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer'
		}
		
		let persons = null;
		
		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return <Person
						click={() => this.deletePersonHandler(index)}
						name={person.name} 
						age={person.age}
						key={person.id}
						changed={(event) => this.nameChangeHandler(event, person.id)} />
					})}
				</div>
			);
			style.backgroundColor = 'red';
		}
		
		let classes = [];
		if (this.state.persons.length <= 2) {
			classes.push('red');
		}
		if (this.state.persons.length <= 1) {
			classes.push('bold');
		}
		
		return (
		<div className="App">
			<h1>Hi, I'm a React App</h1>
			<p className={classes.join(' ')}>This looks pretty cool</p>
			<button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
			{persons}
		</div>
		);
	}
}

export default App;
