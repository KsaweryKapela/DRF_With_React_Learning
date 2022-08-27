import React from 'react';
import logo from './logo.svg';
import './App.css';

async function fetching() {

    const response = await fetch('http://127.0.0.1:8000/');
    const data = await response.json();
    console.log('x');
    console.log(data);
}

function App() {
        fetching();

  return (
    <div className="App">
      <header className="App-header">
            LEARN HARD FETCH HARDER

      </header>
    </div>
  );
}

export default App;
