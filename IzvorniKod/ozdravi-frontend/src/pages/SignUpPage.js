import React from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const SignUpPage = () => {

  const backendRoute = process.env.BACKEND_URL || 'http://localhost:8080'
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Perform login logic
    const response = await fetch(backendRoute + "/register", {
      method: 'POST',
      headers: {
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify({
        'username' : email,
        'password' : password
      })

    })
        // .then(res => res.json())
        // .then(data => console.log(data))


    // If login is successful, navigate to the home page
    if(!response.ok) {
      throw new Error('Dogodila se greska')
    } else {
      navigate('/login');
    }

    console.log(email, password)

  };

  const navigateLogIn = () => {
 
    
    navigate('/login');
  };

  return (
    
    <div className="container  col-12" id = "loginContainer">
    <img src={loginVector} id ="loginVectorMobile" alt = "" ></img>

      <div className="row" id = "loginRow">

        <div className="col-12 mx-auto " >
          <h2>Registracija za Ozdravi Me</h2>
          <p>Unesite svoje podatke</p>
          <form onSubmit={handleSignUp}> 
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{float: 'left'}}>EMAIL</label>
              <input type="text" className="form-control" id="username" value={email}
                     onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{float: 'left'}}>ŠIFRA</label>
              <input type="password" className="form-control" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary col-12 py-2">Registriraj se </button>
            <p className = "pt-3" style={{fontSize: "13px"}}>Već ste član? <span style={{textDecoration: "underline ", cursor: "pointer"}} onClick={navigateLogIn}>Prijava</span> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
