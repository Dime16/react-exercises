import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'jkhgyj3', name: 'Dime', age: 34},
      {id: 'op9ie0p', name: 'Ivan', age: 31},
      {id: 'iye8960', name: 'vojce', age: 31}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(pers => {
      return pers.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]) copying an array

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); // Slice bez arguments pravi kopija od array.
    const persons = [...this.state.persons] // spread operatot sozdava kopje array
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'Green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    }

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click = {() => this.deletePersonHandler(index)}
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
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
      
      <h1>Hi i'm a React App</h1>
      <p className={classes.join(' ')}>This is realy working</p>
      <button
      style={style}
      onClick={this.togglePersonsHandler}>Toggle Persons</button>
      {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now'));
  }
}

export default App;


// This entry now looks slightly different. You'll have to find the following part in your webpack.config.dev.js file:

// {
//   test: cssRegex,
//   exclude: cssModuleRegex,
//   ...
// }
// and then edit that entry.

// Finally, it should look like this:

// {
//   test: cssRegex,
//   exclude: cssModuleRegex,
//   use: getStyleLoaders({
//       importLoaders: 1,
//       modules: true,
//       localIdentName: '[name]__[local]__[hash:base64:5]'
//   }),
// }
// Similarly, when I edit the webpack.config.prod.js file, you will be looking for an entry that tests for cssRegex. In the edited version, it should then look like this:

// {
//   test: cssRegex,
//   exclude: cssModuleRegex,
//   use: getStyleLoaders({
//       importLoaders: 1,
//       modules: true,
//       localIdentName: '[name]__[local]__[hash:base64:5]'
//   }),
// // Don't consider CSS imports dead code even if the
// // containing package claims to have no side effects.
// // Remove this when webpack adds a warning or an error for this.
// // See https://github.com/webpack/webpack/issues/6571
//   sideEffects: true,
// },
// ---