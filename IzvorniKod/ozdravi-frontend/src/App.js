import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App({wordIn}) {
  const [word, setWord] = useState(wordIn);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {wordIn}
        </p>

        <button class = "btn btn-primary">Bootstrap confirmation button</button>

      </header>
    </div>
  );
}

export default App;
