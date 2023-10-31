import React from 'react';
import loginVector from '../../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Perform login logic
        // If login is successful, navigate to the home page
      
        navigate('/home');
      };

    const navigateSignUp = () => {
        
        // Perform login logic
        // If login is successful, navigate to the home page
       
        navigate('/signup');
      };

  return (
    
    <div className="container  col-12" id = "loginContainer">
    <img src={loginVector} id ="loginVectorMobile" className='mt-md-auto' alt = "" ></img>

      <div className="row" id = "loginRow">

        <div className="col-12 mb-auto " >
          <h2>Prijava u Ozdravi Me</h2>
          <p>Unesite svoje podatke</p>
          <form onSubmit={handleLogin}> 
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{float: 'left'}}>EMAIL</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{float: 'left'}}>ŠIFRA</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary col-12 py-2">Prijavi se </button>
            <p class = "pt-3" style={{fontSize: "13px"}}>Niste član? <span style={{textDecoration: "underline ", cursor: "pointer"}} onClick={navigateSignUp}>Registracija</span> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
