import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import LoginPage from './components/LoginPage';

function App({wordIn}) {
  const [word, setWord] = useState(wordIn);

  return (
    <div className="App">
       <LoginPage /> 
    </div>
  );
}

export default App;
