import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List_of_people from './components/list'
import AddToList from "./components/add_to_list";

interface IState {
    people: {
        name: string,
        age: number,
        url: string,
        notes?: string,
    }[]
}

function App() {

    const [people, setPeople] = useState<IState['people']>([
        {
            name: 'xxx',
            age: 99,
            url: 'www.x.pl',
            notes: 'ipsum'
        }
    ])

    people.map(person => {
        console.log('x')
    })

    return (
    <div className="App">
      <h1>People invited to the party</h1>
      <List_of_people people={people} />
      <AddToList />
    </div>
  );
}

export default App;
