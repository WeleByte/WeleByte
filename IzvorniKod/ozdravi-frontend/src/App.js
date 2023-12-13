
import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import HomePage from './pages/HomePage.js';
import Users from './pages/Users';
import SecondOpinions from './pages/SecondOpinions';
import Bolovanja from './pages/Bolovanja';
import ProfilePage from './pages/Profile.js';
import Navbar from './components/Header.js';
import Examinations from "./pages/Examinations";

function App({wordIn}) {
  const [word, setWord] = useState(wordIn);

    useEffect(() => {
        document.title = "Ozdravi"
    }, []);

  return (
    <div className="App">


       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/drugaMisljenja" element={<SecondOpinions />} />
          <Route path="/bolovanja" element={<Bolovanja />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/pregledi" element={<Examinations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
