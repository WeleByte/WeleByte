
import './App.css';
import React, { useState } from "react";

import Racuni from './pages/Admin/Racuni';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import HomePage from './pages/HomePage.js';
import Users from './pages/Users';
import SecondOpinions from './pages/SecondOpinions';
import Bolovanja from './pages/Bolovanja';

function App({wordIn}) {
  const [word, setWord] = useState(wordIn);

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/drugaMisljenja" element={<SecondOpinions />} />
          <Route path="/bolovanja" element={<Bolovanja />} />
          <Route path="/admin/racuni" element={<Racuni />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
