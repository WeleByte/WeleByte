import React from 'react';
import loginVector from '../../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

    const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform login logic
    // If login is successful, navigate to the home page
    console.log("hello")
    navigate('/home');
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
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{float: 'left'}}>ŠIFRA</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary col-12 py-2">Registriraj se </button>
            <p class = "pt-3" style={{fontSize: "13px"}}>Već ste član? <span style={{textDecoration: "underline ", cursor: "pointer"}} onClick={navigateLogIn}>Prijava</span> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
