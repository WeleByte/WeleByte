
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
    const backendRoute = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'
    useEffect(() => {
        document.title = "Ozdravi"
        setBearerToken(sessionStorage.getItem('bearerToken'))
    }, []);

    const [bearerToken, setBearerToken] = useState(sessionStorage.getItem('bearerToken'));

  return (
    <div className="App">


       <BrowserRouter>
        <Routes>
            {bearerToken ? (//redirect from login to home if bearertoken is available
                <>
                    <Route path="/" element={<Navigate to="/home" />} />
                </>
            ) : (//redirect everything to login if no bearer token
                <>
                    <Route path="/" element={<Navigate to="/login" />} />
                    {/*<Route path="/home" element={<Navigate to="/login" />} />*/}
                    {/*<Route path="/users" element={<Navigate to="/login" />} />*/}
                    {/*<Route path="/drugaMisljenja" element={<Navigate to="/login" />} />*/}
                    {/*<Route path="/bolovanja" element={<Navigate to="/login" />} />*/}
                    {/*<Route path="/profil" element={<Navigate to="/login" />} />*/}
                    {/*<Route path="/pregledi" element={<Navigate to="/login" />} />*/}
                </>
            )}

            {/* Routes for components */}
            <Route path="/home" element={<HomePage backendRoute={backendRoute} />} />
            <Route path="/signup" element={<SignUpPage backendRoute={backendRoute} />} />
            <Route path="/login" element={<LoginPage backendRoute={backendRoute} />} />
            <Route path="/users" element={<Users backendRoute={backendRoute} />} />
            <Route path="/drugaMisljenja" element={<SecondOpinions backendRoute={backendRoute} />} />
            <Route path="/bolovanja" element={<Bolovanja backendRoute={backendRoute} />} />
            <Route path="/profil" element={<ProfilePage backendRoute={backendRoute} />} />
            <Route path="/pregledi" element={<Examinations backendRoute={backendRoute} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
