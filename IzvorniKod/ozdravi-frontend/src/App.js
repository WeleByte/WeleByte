import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Register/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App({wordIn}) {
  const [word, setWord] = useState(wordIn);

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
